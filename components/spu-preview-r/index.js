// components/spu-preview/index.js
Component({

    properties: {
        data: Object
    },


    data: {
        tags: Array,
        w: String,
        h: String
    },

    observers: {
        data: function(data) {
            if (!data) {
                return
            }

            if (!data.tags) {
                return
            }
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },


    methods: {
        onImageLoad(event) {
            const { width, height } = event.detail
            this.setData({
                w: 340,
                h: 340 * height / width
            })
        },
        onItemTap(event) {
            // 获取 id
            const pid = event.currentTarget.dataset.pid
            //
            // 跳转
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
