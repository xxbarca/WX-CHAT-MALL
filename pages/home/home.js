
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'

Page({

	data: {
		themeA: null,
		themeE: null,
		bannerB: null,
		grid: [],
		activityD: null
	},

	async onLoad (options) {
		this.initAllData()
	},

	async initAllData() {
		const theme = new Theme()
		await theme.getThemes()
		const themeA = await theme.getHomeLocationA()
		const themeE = await theme.getHomeLocationE()
		const bannerB = await Banner.getHomeLocationB()
		const grid = await Category.getHomeLocationC()
		const activityD = await Activity.getHomeLocationD()
		this.setData({
			themeA,
			themeE,
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