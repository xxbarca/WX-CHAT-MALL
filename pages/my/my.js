// pages/my/my.js
import {CouponStatus} from "../../core/enum"
import {Coupon} from "../../components/models/coupon"

Page({
	data: {
		couponCount: 0
	},
    onLoad: async function (options) {
		const coupons = await Coupon.getMyCoupons(CouponStatus.AVAILABLE)
		this.setData({
			couponCount: coupons.length
		})
    },
	onGotoMyOrder() {
	
	},
	onGotoMyCoupon() {
		wx.navigateTo({
			url:`/pages/my-coupon/my-coupon`
		})
	
	},
	onMgrAddress() {
	
	}
})
