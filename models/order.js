import {OrderException} from "../core/order-exception"
import {OrderExceptionType} from "../core/enum"
import {accAdd} from "../utils/number"
import {Http} from "../utils/http"

class Order {
	
	orderItems
	localItemCount
	
	constructor(orderItems, localItemCount) {
		this.orderItems = orderItems
		this.localItemCount = localItemCount
	}
	
	checkOrderIsOk() {
		this.orderItems.forEach(item => {
			item.isOK()
		})
	}
	
	_orderIsOk() {
		this._emptyOrder()
		this._containNotOnSaleItem()
	}
	
	_emptyOrder() {
		if (this.orderItems.length === 0) {
			throw new OrderException("订单中没有任何商品", OrderExceptionType.EMPTY)
		}
	}
	
	//
	getTotalPriceByCategoryIdList(categoryIdList) {
		if (categoryIdList.length === 0) {
			return 0
		}
		const price = categoryIdList.reduce((pre, cur) => {
			const eachPrice = this.getTotalPriceEachCategory(cur)
			return accAdd(pre, eachPrice)
		}, 0)
		return price
	}
	
	/**
	 * 各分类商品总价格
	 * */
	getTotalPriceEachCategory(categoryId) {
		const price = this.orderItems.reduce((pre, orderItem) => {
			const itemCategoryId = this._isItemInCategories(orderItem, categoryId)
			if (itemCategoryId) {
				return accAdd(pre, orderItem.finalPrice)
			}
			return pre
		}, 0)
		return price
	}
	
	_isItemInCategories(orderItem, categoryId) {
		if (orderItem.categoryId === categoryId) {
			return true
		}
		if (orderItem.rootCategoryId === categoryId) {
			return true
		}
		return false
	}
	
	/**
	 * 是否包含下架商品
	 * */
	_containNotOnSaleItem() {
		if (this.orderItems.length !== this.localItemCount) {
			throw new OrderException("服务器返回订单商品数量与实际不相符", OrderExceptionType.NOT_ON_SALE)
		}
	}
	
	getTotalPrice() {
		return this.orderItems.reduce((pre, item) => {
			const price = accAdd(pre, item.finalPrice)
			return price
		}, 0)
	}
	
	static async postOrderToServer(orderPost) {
		return await Http.request({
			url: '/order',
			method: "POST",
			data: orderPost,
			throwError: true
		})
	}
	
	getOrderSkuInfoList() {
		
		return this.orderItems.map(item => {
			return {
				id: item.skuId,
				count: item.count
			}
		})
	}
}

export {
	Order
}
