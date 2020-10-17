import {SpuListType} from "../../core/enum"

Component({
	
	properties: {
		grid: Array
	},
	
	data: {

	},

	methods: {
		onGotoDetail(event) {
			console.log(event)
			const cid = event.currentTarget.dataset.id
			wx.navigateTo({
				url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.ROOT_CATEGORY}`
			})
		}
	}
})
