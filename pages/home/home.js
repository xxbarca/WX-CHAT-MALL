
import { Theme } from '../../model/theme'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topTheme: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async  function (options) {
		const data = await Theme.getHomeLocationA()
		this.setData({
			topTheme: data[0]
		})
		
	},


	onPullDownRefresh: function () {

	},

	onReachBottom: function () {

	},

	onShareAppMessage: function () {

	}
})