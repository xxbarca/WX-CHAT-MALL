// pages/coupon/coupon.js
import {Activity} from "../../models/activity"

Page({
	
    data: {
		coupons: []
    },
	
    onLoad: async function (options) {
  	    const aName = options.name
	    const type = options.type
	    
	    let activity = await Activity.getActivityWithCoupon(aName)
	    this.setData({
		    coupons: activity.coupons
	    })
	    
    },
})
