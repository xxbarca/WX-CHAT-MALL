
import {Cart} from "../../models/cart"
import {Calculator} from "../../models/calculator"
import {ShoppingWay} from "../../core/enum"
import {Spu} from "../../models/spu"

const cart = new Cart()

Page({
	
    data: {
	    cartItems: [],
	    isEmpty: false,
	    totalPrice: 0,
	    totalSkuCount: 0,
	    allChecked: false,
    },
	
	/**
	 * 全选 true false
	 * */
	onCheckAll: function(options) {
    	const checked = options.detail.checked
		cart.checkAll(checked)
		this.setData({
			cartItems: cart.getAllCartItemFromLocal().items
		})
		this.refreshCartData()
	},
	
	//
	removeCheckedItems() {
		const cartData = this._getCartData()
		for (let i = 0; i < cartData.items.length; i++) {
			if (cartData.items[i].checked) {
				cartData.items.splice(i, 1)
			}
		}
		this._refreshStorage()
	},
	
	/**
	 * 是否全部选中
	 * */
	isAllChecked() {
		this.setData({
			allChecked: cart.isAllChecked()
		})
	},
	
	onLoad: async function() {
    	const cartItem = await cart.getAllSkuFromServer()
		this.setData({
			cartItems: cartItem.items
		})
	},
	
	onShow: async function (options) {
		const cartItems = cart.getAllCartItemFromLocal().items
		if (cart.isEmpty()) {
			await this.empty()
			return
		}
		this.setData({
			cartItems
		})
		this.notEmpty()
		this.isAllChecked()
		this.refreshCartData()
	},
	
	/**
	 * 刷新数据
	 * */
	refreshCartData() {
    	const checkedItems = cart.getCheckedItems()
		const calculator = new Calculator(checkedItems)
		
		calculator.calc()
		this.setCalcData(calculator)
	},
	
	setCalcData(calculator) {
    	const totalPrice = calculator.getTotalPrice()
		const totalSkuCount = calculator.getTotalSkuCount()
		this.setData({
			totalPrice,
			totalSkuCount
		})
	},
	
	/**
	 * 结算
	 * */
	onSettle() {
		if (this.data.totalSkuCount <= 0) {
			return
		}
		
		wx.navigateTo({
			url: `/pages/order/order?way=${ShoppingWay.CART}`
		})
	},
	
	/**
	 * 单选
	 * */
	onSingleCheck: function(event) {
		this.isAllChecked()
		this.refreshCartData()
	},
	
	/**
	 * 删除
	 * */
	onDeleteItem: function(event) {
		this.isAllChecked()
		this.refreshCartData()
	},
	
	/**
	 * 变更数量
	 * */
	onCountFloat: function() {
    	this.refreshCartData()
	},
	
	async empty() {
    	this.setData({
		    isEmpty: true
	    })
		const data = await Spu.getLatestSpu()
		wx.lin.renderWaterFlow(data.list)
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
