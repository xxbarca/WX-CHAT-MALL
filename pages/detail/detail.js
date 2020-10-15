// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {CouponCenterType, ShoppingWay} from "../../core/enum"
import {SaleExplain} from "../../models/sale-explain"
import {getWindowHeightRpx} from "../../utils/system"
import {CartItem} from "../../models/cart-item"
import {Cart} from "../../models/cart"
import {Coupon} from "../../models/coupon"

Page({

    data: {
        spu: Object,
        showRealm: false,
        orderWay: String,
        specs: Object,
        explain: Object,
        h: String,
	    cartItemCount: 0,
	    coupons: []
    },

    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
	    const coupons = await Coupon.getTop2CouponsByCategory(spu.category_id)
        const explain = await SaleExplain.getFixed()
        const windowHeight = await getWindowHeightRpx()
        const h = windowHeight - 100
        this.setData({
            spu,
            explain,
            h,
	        coupons
        })
	    this.updateCartItemCount()
    },
	
	onGoToCouponCenter() {
    	const type = CouponCenterType.SPU_CATEGORY
		const cid = this.data.spu.category_id
		wx.navigateTo({
			url: `/pages/coupon/coupon?cid=${cid}&type=${type}`
		})
	},
	
	/**
	 * 逻辑1: 立即购买
	 * 逻辑2: 加入购物车
	 * */
	onShopping(event) {
		const chooseSku = event.detail.sku
		const skuCount = event.detail.skuCount
		// => 加入购物车
		if (event.detail.orderWay === ShoppingWay.CART) {
			const cartItem = new CartItem(chooseSku, skuCount)
			const cart = new Cart()
			cart.addItem(cartItem)
			this.updateCartItemCount()
		}
		
		// => 立即购买
		if (event.detail.orderWay === ShoppingWay.BUY) {
			wx.navigateTo({
				url: `/pages/order/order?sku_id=${chooseSku.id}&count=${skuCount}&way=${ShoppingWay.BUY}`
			})
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
