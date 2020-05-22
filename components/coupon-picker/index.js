// components/coupon-picker/index.js
import {getSlashYMD} from "../../utils/date"

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
		    const satisfactionCount = this.getSatisfactionCount()
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
	    getSatisfactionCount() {}
    }
})
