// pages/cart/cart.js
import {Cart} from "../../models/cart"

Page({
	
    data: {
	    cartItems: [],
	    isEmpty: false
    },
	
	onShow: function (options) {
		const cart = new Cart()
		const cartItems = cart.getAllCartItemFromLocal().items
		if (cart.isEmpty()) {
			this.empty()
			return
		}
		this.setData({
			cartItems
		})
		this.notEmpty()
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
