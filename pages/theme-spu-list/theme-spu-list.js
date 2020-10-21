// pages/theme-spu-list/theme-spu-list.js
import {Theme} from "../../models/theme"

Page({

  
    data: {
	    empty: false,
	    paging: null,
	    loading: true,
	    loadingType: 'loading',
	    topImg:String,
	    h: null,
	    w: null
    },
	
    onLoad: async function (options) {
	    const tName = options.tname
	    await this.initThemeData(tName)
    },
	
	async initThemeData(tName) {
		const data = await Theme.getThemeSpuByName(tName)
		if (data && data.spu_list.length !== 0) {
			wx.lin.renderWaterFlow(data.spu_list)
			this.setData({
				loadingType: 'end',
				topImg: data.internal_top_img,
				descriptions: this.splitDescription(data.description)
			})
		} else {
		
		}
	},
	
	splitDescription(description) {
		if (!description) {
			return []
		}
		return description.split('#');
	},
	onLoadImg(event) {
		const {height, width} = event.detail
		this.setData({
			h: height,
			w: width,
		})
	}

})
