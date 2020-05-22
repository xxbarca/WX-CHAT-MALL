// pages/order/order.js

import {Cart} from "../../models/cart"
import {Sku} from "../../models/sku"
import {OrderItem} from "../../models/order-item"
import {Order} from "../../models/order"
import {Coupon} from "../../components/models/coupon"
import {CouponBo} from "../../models/coupon-bo"

const cart = new Cart()

Page({
	data: {
		orderItems: Array,
		isOk: Boolean,
		// 显示优惠券数据
		couponBoList: [],
		totalPrice: 0,
		discountMoney: 0
	},
	
	onLoad: async function () {
		let orderItems;
		let localItemCount
		const skuIds = cart.getCheckedSkuIds()
		orderItems = await this.getCartOrderItems(skuIds)
		localItemCount = skuIds.length
		const order = new Order(orderItems, localItemCount)
		
		try {
			order.checkOrderIsOk()
		} catch (e) {
			this.setData({
				isOk: false
			})
			return
		}
		
		const coupons = await Coupon.getMySelfWithCategory()
		const couponBoList = this.packageCouponBoList(coupons, order)
		this.setData({
			orderItems: orderItems,
			couponBoList: couponBoList,
			totalPrice: order.getTotalPrice()
		})
	},
	
	onChooseCoupon() {
	
	},
	
	// 同步最新的sku数据
	async getCartOrderItems(skuIds) {
		const skus = await Sku.getSkusByIds(skuIds)
		const orderItems = this.packageOrderItems(skus)
		return orderItems
	},
	
	packageOrderItems(skus) {
		return skus.map(sku => {
			const count = cart.getSkuCountBySkuId(sku.id)
			return new OrderItem(sku, count)
		})
	},
	
	packageCouponBoList(coupons, order) {
		return coupons.map(coupon => {
			const couponBo = new CouponBo(coupon)
			couponBo.meetCondition(order)
			return couponBo
		})
	}
	
})
