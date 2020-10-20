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
    	let coupons = await Coupon.getMyCoupons(status)
		coupons = coupons.map(item => {
			return {
				...item,
				userCollected: true
			}
		})
		this.setData({
			coupons,
			activeKey: status
		})
	},
	
	async onSegmentChange(event) {
    	await this.change(event.detail.activeKey)
	}
 
})
