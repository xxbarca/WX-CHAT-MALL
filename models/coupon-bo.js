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
		this.categoryIds = coupon.categories.map(category => {
			return category.id
		})
	}
	
	meetCondition(order) {
	
	}
	
}

export {
	CouponBo
}
