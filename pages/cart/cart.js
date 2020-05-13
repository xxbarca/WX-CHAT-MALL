
import {Cart} from "../../models/cart"

const cart = new Cart()

Page({
	
    data: {
	    cartItems: [],
	    isEmpty: false,
	    totalPrice: 0,
	    totalSkuCount: 0,
	    allChecked: false
    },
	
	onCheckAll: function(options) {
    	const checked = options.detail.checked
		cart.checkAll(checked)
		this.setData({
			cartItems: cart.getAllCartItemFromLocal().items
		})
	},
	
	isAllChecked() {
		this.setData({
			allChecked: cart.isAllChecked()
		})
	},
	
	onShow: async function (options) {
		const cartItems = cart.getAllCartItemFromLocal().items
		if (cart.isEmpty()) {
			this.empty()
			return
		}
		this.setData({
			cartItems
		})
		this.notEmpty()
		this.isAllChecked()
	},
	
	onSingleCheck: function(event) {
		this.isAllChecked()
	},
	
	onDeleteItem: function(event) {
    	const skuId = event.detail.skuId
		this.isAllChecked()
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
