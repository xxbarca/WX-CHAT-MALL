// components/spu-preview/index.js
Component({
	
	properties: {
		data: Object
	},

	
	data: {
		tags: Array
	},

	observers: {
		data: function(data) {
			if (!data) {
				return
			}

			if (!data.tags) {
				return
			}
			const tags = data.tags.split('$')
			this.setData({
				tags
			})
		}
	},

	
	methods: {
		onImageLoad(event) {
			const { width, height } = event.detail
			this.setData({
				w: 340,
				h: 340 * height / width
			})
			
		}
	}
})
