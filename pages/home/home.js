
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'

Page({

	data: {
		themeA: null,
		themeE: null,
		bannerB: null,
		themeESpu: [],
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
		let themeESpu = []
		if (themeE.online) {
			const data = await Theme.getHomeLocationESpu()
			if (data) {
				themeESpu = data.spu_list.splice(0, 8)
			}
		}
		const bannerB = await Banner.getHomeLocationB()
		const grid = await Category.getHomeLocationC()
		const activityD = await Activity.getHomeLocationD()
		this.setData({
			themeA,
			themeE,
			themeESpu,
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