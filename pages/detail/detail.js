// pages/detail/detail.js
import {Spu} from "../../models/spu";

Page({


    data: {
        spu: Object
    },


    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        this.setData({
            spu
        })


    },






})