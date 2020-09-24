// components/coupon-picker/index.js
import {getSlashYMD} from "../../utils/date"
import {CouponOperate} from "../../core/enum"

Component({
  
    properties: {
		coupons: Array
    },
	
	observers: {
    	'coupons': function (coupons) {
			if(coupons.length === 0) {
				return
			}
			const couponsView = this.convertToView(coupons)
		    const satisfactionCount = this.getSatisfactionCount(coupons)
		    this.setData({
			    _coupons: couponsView,
			    satisfactionCount
		    })
	    }
	},
	
    data: {
	    _coupons: [],
	    satisfactionCount: 0,
	    currentKey: null
    },
	
    methods: {
	    convertToView(coupons) {
	    	const couponsView = coupons.map(coupon => {
	    		return {
	    			id: coupon.id,
				    title: coupon.title,
				    startTime: getSlashYMD(coupon.startTime),
				    endTime: getSlashYMD(coupon.endTime),
				    satisfaction: coupon.satisfaction
			    }
		    })
		    couponsView.sort((a, b) => {
		    	if (a.satisfaction) {
		    		return -1
			    }
		    })
		    return couponsView
	    },
	    getSatisfactionCount(coupons) {
	    	let count = 0;
	    	for (let i = 0; i < coupons.length; i++) {
	    		if (coupons[i].satisfaction === true) {
	    			count += 1
			    }
		    }
	    	return count
	    },
	    
	    onChange(event) {
	    	const currentKey = event.detail.currentKey
		    const key = event.detail.key
		    this.setData({
			    currentKey
		    })
		    const currentCoupon = this.findCurrentCoupon(currentKey, key)
		    this.triggerEvent("choose", {
		    	coupon: currentCoupon,
			    operate: this.decidePickOrUnPick(currentKey)
		    })
	    },
	
	    decidePickOrUnPick(currentKey) {
	    	if (currentKey === null) {
	    		return CouponOperate.UNPICK
		    } else {
	    		return CouponOperate.PICK
		    }
	    },
	    
	    findCurrentCoupon(currentKey, key) {
	    	if (currentKey === null) {
	    		// 用户取消了优惠券
			    return this.properties.coupons.find(coupon => (coupon.id).toString() === key)
		    }
	    	return this.properties.coupons.find(coupon => coupon.id.toString() === currentKey)
	    }
    }
})
