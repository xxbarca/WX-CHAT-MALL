// components/spu-scroll/index.js
Component({
	
	properties: {
		theme: Object,
		spuList: Array
	},

	data: {

	},
	
	methods: {
		onCellTap(event) {
			const pid = event.currentTarget.dataset.id
			wx.navigateTo({
				url: `/pages/detail/detail?pid=${pid}`
			})
		},
		handleOnJumpTheme(event) {
			const theme = event.target.dataset.theme
			wx.navigateTo({
				url: `/pages/theme/theme?name=${theme.name}`
			})
		},
	}
})
