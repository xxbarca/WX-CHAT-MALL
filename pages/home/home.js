
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'

Page({

	data: {
		themeA: null,
		themeE: null,
		themeF: null,
		themeH: null,
		bannerB: null,
		bannerG: null,
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
		const themeA = theme.getHomeLocationA()
		const themeE = theme.getHomeLocationE()
		const themeH = theme.getHomeLocationH()
		const themeF = theme.getHomeLocationF()
		let themeESpu = []
		if (themeE.online) {
			const data = await Theme.getHomeLocationESpu()
			if (data) {
				themeESpu = data.spu_list.splice(0, 8)
			}
		}
		const bannerB = await Banner.getHomeLocationB()
		const bannerG = await Banner.getHomeLocationG()
		const grid = await Category.getHomeLocationC()
		const activityD = await Activity.getHomeLocationD()
		this.setData({
			themeA,
			themeE,
			themeF,
			themeH,
			themeESpu,
			bannerB,
			bannerG,
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