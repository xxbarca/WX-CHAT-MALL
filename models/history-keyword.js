
class HistoryKeyword {

    static MAX_ITEM_COUNT = 20
    static KEY = 'keywords'

    keywords = []

    constructor() {
        this.keywords = this._getLocalKeywords()
    }

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
        this._refreshLocal()
    }

    get() {
        return this.keywords
    }

    clear() {
        this.keywords = []
        this._refreshLocal()
    }

    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
    }

    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY);
        if (!keywords) {
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return []
        }
        return keywords
    }

}