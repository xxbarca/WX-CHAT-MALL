// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum"
import {SaleExplain} from "../../models/sale-explain"
import {getWindowHeightRpx} from "../../utils/system"
import {CartItem} from "../../models/cart-item"
import {Cart} from "../../models/cart"

Page({

    data: {
        spu: Object,
        showRealm: false,
        orderWay: String,
        specs: Object,
        explain: Object,
        h: String,
	    cartItemCount: 0
    },

    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        const explain = await SaleExplain.getFixed()
        const windowHeight = await getWindowHeightRpx()
        const h = windowHeight - 100
        this.setData({
            spu,
            explain,
            h
        })
	    this.updateCartItemCount()
    },
	
	/**
	 * 逻辑1: 立即购买
	 * 逻辑2: 加入购物车
	 * */
	onShopping(event) {
    	const chooseSku = event.detail.sku
		const skuCount = event.detail.skuCount
		if (event.detail.orderWay === ShoppingWay.CART) {
			const cartItem = new CartItem(chooseSku, skuCount)
			const cart = new Cart()
			cart.addItem(cartItem)
			this.updateCartItemCount()
		}
	},
	
	updateCartItemCount() {
		const cart = new Cart()
		
		this.setData({
			showRealm: false,
			cartItemCount: cart.getCartItemCount()
		})
	},

    onGoToCart(event) {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },

    onGoToHome(event) {
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onAddToCart(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
    },

    onBuy(event) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },
})
