// pages/cart/cart.js
import {Cart} from "../../models/cart"
import {getSystemSize} from "../../utils/system"

Page({
	
    data: {
	    cartItems: [],
	    isEmpty: false,
	    totalPrice: 0,
	    totalSkuCount: 0,
	    allChecked: true
    },
	
	onCheckAll: function(options) {
	},
	
	onShow: async function (options) {
    	const res = await getSystemSize()
		const cart = new Cart()
		const cartItems = cart.getAllCartItemFromLocal().items
		// const allChecked = cartItems.find(item => {
		// 	return item.checked === false
		// })
		// if (!allChecked) {
		// 	this.setData({
		// 		allChecked: true
		// 	})
		// }
		if (cart.isEmpty()) {
			this.empty()
			return
		}
		this.setData({
			cartItems
		})
		this.notEmpty()
	},
	
	onItemCheck: function() {
    	console.log(123)
	},
	
	onDeleteItem: function() {
    	console.log(234)
	},
	
	empty() {
    	this.setData({
		    isEmpty: true
	    })
		wx.hideTabBarRedDot({
			index: 2
		})
	},
	
	notEmpty() {
    	this.setData({
		    isEmpty: false
	    })
		wx.showTabBarRedDot({
			index: 2
		})
	}
	
})
