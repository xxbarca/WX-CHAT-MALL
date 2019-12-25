
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'

Page({

	data: {
		themeA: null,
		bannerB: null,
		grid: [],
		activityD: null
	},

	async onLoad (options) {
		this.initAllData()
	},

	async initAllData() {
		const themeA = await Theme.getHomeLocationA()
		const bannerB = await Banner.getHomeLocationB()
		const grid = await Category.getHomeLocationC()
		const activityD = await Activity.getHomeLocationD()
		this.setData({
			themeA: themeA[0],
			bannerB,
			grid,
			activityD
		})
		
	},


	onPullDownRefresh: function () {

	},

	onReachBottom: function () {

	},

	onShareAppMessage: function () {

	}
})