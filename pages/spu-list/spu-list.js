// pages/spu-list/spu-list.js
import {Spu} from "../../models/spu"
import {SpuListType} from "../../core/enum"

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
		let data = null
		if (type === SpuListType.SUB_CATEGORY) {
			data = await Spu.getByCategory(cid)
		}
		if (type === SpuListType.ROOT_CATEGORY) {
			data = await Spu.getByCategory(cid, true)
		}
		console.log(data)
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
