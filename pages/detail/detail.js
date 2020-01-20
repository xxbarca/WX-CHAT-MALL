// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum"

Page({

    data: {
        spu: Object,
        showReaml: false,
        orderWay: String,
        specs: Object
    },

    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        this.setData({
            spu
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
            showReaml: true,
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
            showReaml: true,
            orderWay: ShoppingWay.BUY
        })
    },
})