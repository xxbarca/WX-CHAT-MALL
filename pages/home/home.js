
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'

Page({

	data: {
		themeA: null,
		bannerB: null
	},

	async onLoad (options) {
		this.initAllData()
	},

	async initAllData() {
		const themeA = await Theme.getHomeLocationA()
		const bannerB = await Banner.getHomeLocationB()
		this.setData({
			themeA: themeA[0],
			bannerB
		})
		
	},


	onPullDownRefresh: function () {

	},

	onReachBottom: function () {

	},

	onShareAppMessage: function () {

	}
})