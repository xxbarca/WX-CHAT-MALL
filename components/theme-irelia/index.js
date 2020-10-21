// components/theme-irelia/index.js
import {randomArray} from "../../utils/random"

Component({
 
    properties: {
	  theme: Object
    },
	data: {
		h: null,
		w: null,
		topImg: null,
		description: '',
		spuList: [],
		randoms: Array
	},
	
	observers: {
		'theme': function (theme) {
			this.setData({
				topImg: theme.extend,
				descriptions: theme.description.split('#'),
				spuList: theme.spu_list
			})
			const randoms = this.getRandoms(theme.spu_list.length)
			this.setData({
				randoms: randoms
			})
		}
	},
	
	methods: {
		getRandoms(size) {
			return randomArray(size)
		},
		onLoadImg(event) {
			const {height, width} = event.detail
			this.setData({
				h: height,
				w: width,
			})
		},
		onGoToSpu(event) {
			const id = event.currentTarget.dataset.spu.id
			wx.navigateTo({
				url: `/pages/detail/detail?pid=${id}`
			})
		}
	}
})
