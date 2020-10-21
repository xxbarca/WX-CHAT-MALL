import {Banner} from "../../models/banner"

Component({
	
	properties: {
		banner: Object
	},

	observers: {
		'banner': function(banner) {
			if(!banner) {
				return
			}

			if(banner.items.length == 0) {
				return
			}

			const left = banner.items.find(t => t.name === 'left')
			const rightTop = banner.items.find(t => t.name === 'right-top')
			const rightBottom = banner.items.find(t => t.name === 'right-bottom')

			this.setData({
				left,
				rightTop,
				rightBottom
			})
		}
	},
	
	data: {
		left: Object,
		rightTop: Object,
		rightBottom: Object
	},

	
	methods: {
		onGotoDetail(event) {
			const keyword = event.currentTarget.dataset.keyword
			const type = event.currentTarget.dataset.type
			Banner.gotoTarget(type, keyword)
		}
	}
})
