// pages/my-coupon/my-coupon.js
import {CouponStatus} from "../../core/enum"
import {Coupon} from "../../components/models/coupon"

Page({
	
    data: {
		activeKey: CouponStatus.AVAILABLE,
	    coupons: []
    },
	
    onLoad: async function (options) {
		await this.change(CouponStatus.AVAILABLE)
    },
	
	async change(status) {
    	const coupons = await Coupon.getMyCoupons(status)
		this.setData({
			coupons,
			activeKey: status
		})
	},
	
	async onSegmentChange(event) {
    	await this.change(event.detail.activeKey)
	}
 
})
