// components/coupon/index.js
import {CouponStatus} from "../../core/enum"
import {getSlashYMD} from "../../utils/date"
import {showToast} from "../../utils/ui"
import {Coupon} from "../models/coupon"

Component({
	properties: {
		coupon: Object,
		status: {
			type: Number,
			value: CouponStatus.CAN_COLLECT
		}
	},
	
	data: {
		_startTime: String,
		_endTime: String,
		// _status: CouponStatus.CAN_COLLECT
	},
	
	observers: {
		'coupon': function (coupon) {
			
			if (!coupon) {
				return
			}
			this.setData({
				_endTime: getSlashYMD(coupon.end_time),
				_startTime: getSlashYMD(coupon.start_time),
			})
		}
	}
})
