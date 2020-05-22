import {CouponType} from "../core/enum"

class CouponBo {
	
	constructor(coupon) {
		this.type = coupon.type
		this.fullMoney = coupon.full_money
		this.rate = coupon.rate
		this.minus = coupon.minus
		this.id = coupon.id
		this.startTime = coupon.start_time
		this.endTime = coupon.end_time
		this.wholeStore = coupon.whole_store
		this.title = coupon.title
		this.satisfaction = false
		this.categoryIds = coupon.categories.map(category => {
			return category.id
		})
	}
	
	/**
	 * 计算当前优惠券是否满足当前订单
	 * */
	meetCondition(order) {
		let categoryTotalPrice = 0
		if (this.wholeStore) {
			// 全场券 通用
			let bottomListPrice = order.getTotalPrice()
		} else {
			// 不是全场券需按分类计算
			categoryTotalPrice = order.getTotalPriceByCategoryIdList(this.categoryIds)
		}
		
		let satisfaction = false
		switch (this.type) {
			case CouponType.FULL_MINUS:
			case CouponType.FULL_OFF:
				satisfaction = this._fullTypeCouponIsOk(categoryTotalPrice)
				break
			case CouponType.NO_THRESHOLD_MINUS:
				satisfaction = true
				break
			default:
				break
		}
		this.satisfaction = satisfaction
	}
	
	_fullTypeCouponIsOk(categoryTotalPrice) {
		if (categoryTotalPrice >= this.fullMoney) {
			return true
		}
		return false
	}
	
}

export {
	CouponBo
}
