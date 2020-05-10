// components/checkbox/index.js
Component({
 
	properties: {
		checked: Boolean
	},
	
	data: {},
	
	methods: {
		onCheck: function (event) {
			let checked = this.properties.checked
			this.setData({
				checked: !this.properties.checked
			})
			this.triggerSpecEvent('check', {
				checked: checked ? false : true
			}, {
				bubbles: true,
				composed: true
			})
		}
	}
})
