// pages/order/order.js

import {Cart} from "../../models/cart"
import {Sku} from "../../models/sku"
import {OrderItem} from "../../models/order-item"
import {Order} from "../../models/order"
import {Coupon} from "../../components/models/coupon"
import {CouponBo} from "../../models/coupon-bo"
import {CouponOperate, CouponType, ShoppingWay} from "../../core/enum"
import {showToast} from "../../utils/ui"
import {OrderPost} from "../../models/order-post"

const cart = new Cart()

Page({
	data: {
		orderItems: Array,
		isOk: Boolean,
		// 显示优惠券数据
		couponBoList: [],
		totalPrice: 0,
		discountMoney: 0,
		finalTotalPrice: 0,
		order: null,
		currentCouponId: null,
		address: null,
		submitBtnDisable: false,
		orderFailMsg: '',
		orderFail: false,
		shoppingWay: ShoppingWay.BUY
	},

	onLoad: async function (options) {
		let orderItems;
		let localItemCount
		const shoppingWay = options.way
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
			totalPrice: order.getTotalPrice(),
			finalTotalPrice: order.getTotalPrice(),
			order,
			shoppingWay
		})
	},

	onChooseCoupon(event) {
		const couponObj = event.detail.coupon
		
		const couponOperate = event.detail.operate
		if (couponOperate === CouponOperate.PICK) {
			const priceObj = CouponBo.getFinalPrice(this.data.order.getTotalPrice(), couponObj)
			this.setData({
				finalTotalPrice: priceObj.finalPrice,
				discountMoney: priceObj.discountMoney,
				currentCouponId: couponObj.id
			})
		} else {
			this.setData({
				finalTotalPrice: this.data.order.getTotalPrice(),
				discountMoney: 0,
				currentCouponId: null
			})
		}

	},
	
	onChooseAddress(event) {
		const address = event.detail.address
		this.setData({
			address: address
		})
	},

	async onSubmit() {
		if (!this.data.address) {
			showToast("请选择收获地址")
			return
		}
		this.disableSubmitBtn()
		const order = this.data.order
		const orderPost = new OrderPost(
			this.data.totalPrice,
			this.data.finalTotalPrice,
			this.data.currentCouponId,
			order.getOrderSkuInfoList(),
			this.data.address
		)
		
		console.log(orderPost)
		const oid = await this.postOrder(orderPost)
		
		if (!oid) {
			this.enableSubmitBtn()
			return
		}
		if (this.data.shoppingWay === ShoppingWay.CART) {
			cart.removeCheckedItems()
		}
		
		// 支付
		
	},
	
	
	async postOrder(orderPost) {
		try {
			const serverOrder = await Order.postOrderToServer(orderPost)
			if (serverOrder) {
				console.log(serverOrder)
				return serverOrder.id
			}
		} catch (e) {
			this.setData({
				orderFail: true,
				orderFailMsg: e.message
			})
		}
	},
	
	/**
	 * 防止用户多次点击
	 * */
	disableSubmitBtn() {
		this.setData({
			submitBtnDisable: true
		})
	},
	
	enableSubmitBtn() {
		this.setData({
			submitBtnDisable: false
		})
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
