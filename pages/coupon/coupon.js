// pages/coupon/coupon.js
import {Activity} from "../../models/activity"
import {CouponCenterType} from "../../core/enum"
import {Coupon} from "../../models/coupon"

Page({
	
    data: {
		coupons: []
    },
	
    onLoad: async function (options) {
  	    const aName = options.name // 根据活动去加载
	    const type = options.type
	    const cid = options.cid // 根据分类去加载
	    
	    let coupons
	    if (type === CouponCenterType.ACTIVITY) {
	    	const activity = await Activity.getActivityWithCoupon(aName)
		    coupons = activity.coupons
	    }
	    if (type === CouponCenterType.SPU_CATEGORY) {
		    coupons = await Coupon.getCouponsByCategory(cid)
		    const wholeStoreCoupons = await Coupon.getWholeStoreCoupons()
		    coupons = coupons.concat(wholeStoreCoupons)
	    }
	    this.setData({
		    coupons: coupons
	    })
    },
})
