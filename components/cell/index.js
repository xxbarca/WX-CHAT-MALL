// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object,
        x: Number,
        y: Number
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
	
	        // cell -> fence -> realm
            this.triggerEvent('celltap', {
                // 子组件通过事件向父组件传参
                cell: this.properties.cell,
                x: this.properties.x,
                y: this.properties.y
            }, {
                // 是否冒泡
                bubbles: true,
                // 跨越组件
                composed: true
            })
        }
    }
})
