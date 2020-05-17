// pages/order/order.js

import {Cart} from "../../models/cart"
import {Sku} from "../../models/sku"
import {OrderItem} from "../../models/order-item"

const cart = new Cart()

Page({
	data: {
		orderItems: Array
	},
	
	onLoad: async function () {
		let orderItems;
		const skuIds = cart.getCheckedSkuIds()
		orderItems = await this.getCartOrderItems(skuIds)
		
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
		
	}
})
