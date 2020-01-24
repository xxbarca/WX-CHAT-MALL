
class HistoryKeyword {

    static MAX_ITEM_COUNT = 20
    keywords = []

    save(keyword) {
        const items = this.keywords.filter(k => {
            return k === keyword
        })
        // 存在相同的,不保存
        if (items.length !== 0) {
            return
        }

        // 超出数组最大值
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            this.keywords.pop()
        }
        this.keywords.unshift(keyword)
    }

    get() {
        return this.keywords
    }

    clear() {

    }
}