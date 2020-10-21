// components/theme-diana/index.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
	  theme: Object
    },
	data: {
		h: null,
		w: null,
		topImg: null,
		description: '',
		spuList: []
	},
	
	observers: {
		'theme': function (theme) {
			console.log(theme)
			this.setData({
				topImg: theme.extend,
				descriptions: theme.description.split('#'),
				spuList: theme.spu_list
			})
		}
	},
	
	methods: {
		onLoadImg(event) {
			const {height, width} = event.detail
			console.log(height,width)
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
