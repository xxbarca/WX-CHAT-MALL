import {getSystemSize} from "../../utils/system"
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util"
import {Categories} from "../../models/categories"

import {SpuListType} from "../../core/enum"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        segHeight: String,
        defaultRootId: 2,
        roots: Array,
        currentSubs: Array,
        currentBannerImg: String
    },

    onGotoSearch() {
        wx.navigateTo({
          url: `/pages/search/search`
        })
    },
	onJumpToSpuList(event) {
		const cid = event.detail.cid
		wx.navigateTo({
			url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
		})
	},
	onSegChange(event) {
		const rootId = event.detail.activeKey
		const currentSubs = this.data.categories.getSubs(rootId)
		const currentRoot = this.data.categories.getRoot(rootId)
		this.setData({
			currentSubs,
			currentBannerImg: currentRoot.img
		})
	},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.setDynamicSegmentHeight()
        // 加载数据
        this.initCategoryData()
    },

    async initCategoryData() {
        const categories = new Categories()
        this.data.categories = categories
        await categories.getAll()
        const roots = categories.getRoots()
        const defaultRoot = this.getDefaultRoot(roots)
        const currentSubs = categories.getSubs(defaultRoot.id)
        this.setData({
            roots,
            currentSubs,
            currentBannerImg: defaultRoot.img
        })
    },

    getDefaultRoot(roots) {
        let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
        if (!defaultRoot) {
            defaultRoot = roots[0]
        }
        return defaultRoot
    },

    async setDynamicSegmentHeight() {
        const res = await getSystemSize()
        const windowHeightRpx = px2rpx(res.windowHeight)
        const h = windowHeightRpx - 60 - 20 - 2
        this.setData({
            segHeight: h
        })
    },
	
})
