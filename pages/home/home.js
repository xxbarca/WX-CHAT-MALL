// pages/home/home.js
import {Theme} from '../../models/theme'
import {Banner} from '../../models/banner'
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";
import {CouponCenterType} from "../../core/enum"
import {Spu} from "../../models/spu"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
		themeE: null,
		themeF: null,
		bannerB: null,
		bannerG: null,
        grid: [],
        activityD: null,
        spuPaging: null,
        loadingType: 'loading'
    },

    async onLoad(options) {
        await this.initAllData()
        // await this.initBottomSpuList()
	    await this.initBottomSpus()
    },
	
	async initBottomSpus() {
        const data = await Spu.getLatestSpu()
		wx.lin.renderWaterFlow(data.list)
		this.setData({
			loadingType: 'end'
		})
	},

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()

        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()
        let themeESpu = []

        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }

        const themeF = theme.getHomeLocationF()

        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()

        const bannerG = await Banner.getHomeLocationG()

        const themeH = theme.getHomeLocationH()

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },
	
	handleOnJumpTheme(event) {
    	const theme = event.target.dataset.theme
		wx.navigateTo({
			url: `/pages/theme/theme?name=${theme.name}`
		})
	},

    onReachBottom: async function () {
    	// TODO - 下拉刷新
    	return
        const data = await this.data.spuPaging.getMoreData()
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
        if(!data.moreData){
            this.setData({
                loadingType:'end'
            })
        }
    },
	onGoToBanner(event) {
		const keyword = event.currentTarget.dataset.keyword
		const type = event.currentTarget.dataset.type
		Banner.gotoTarget(type, keyword)
	},
	
	onGoToCoupons: function(event) {
    	const name = event.currentTarget.dataset.aname
    	wx.navigateTo({
		    url: `/pages/coupon/coupon?name=${name}&type=${CouponCenterType.ACTIVITY}`
	    })
	},

    onPullDownRefresh: async function () {
    },


    onShareAppMessage: function () {

    }
})


