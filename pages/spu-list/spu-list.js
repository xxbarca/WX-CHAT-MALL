// pages/spu-list/spu-list.js
import {Spu} from "../../models/spu"

Page({
	properties: {
	
	},

	data: {
		spuData: Object,
		isEmpty: Boolean,
		loadingType: 'end'
	},
	onLoad: async function(options) {
		const { cid, type } = options
		const data = await Spu.getByCategory(cid)
		wx.lin.renderWaterFlow(data.list)
		this.setData({
			spuData: data,
			isEmpty: data.list.length === 0
		})
		
	},
	
	onGoToDetail(event) {
		const id = event.currentTarget.dataset.id
		wx.navigateTo({
			url: `/pages/detail/detail?pid=${id}`
		})
	}
})
