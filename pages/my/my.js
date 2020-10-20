// pages/my/my.js
import {AuthAddress, CouponStatus} from "../../core/enum"
import {Coupon} from "../../components/models/coupon"
import {promisic} from "../../utils/util"

Page({
	data: {
		couponCount: 0,
		showDialog: false
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
	async onMgrAddress() {
		const authStatus = await this.hasAuthorizedAddress()
		if (authStatus === AuthAddress.DENY) {
			this.setData({
				showDialog: true
			})
			return
		}
		await this.openAddress()
	},
	
	async hasAuthorizedAddress() {
		const settings = await promisic(wx.getSetting)()
		const addressSetting = settings.authSetting['scope.address']
		if (addressSetting === undefined) {
			return AuthAddress.NOT_AUTH
		}
		if (addressSetting === false) {
			return AuthAddress.DENY
		}
		if (addressSetting === true) {
			return AuthAddress.AUTHORIZED
		}
	},
	
	async openAddress() {
		await promisic(wx.chooseAddress)()
	}
})
