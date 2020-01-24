import {HistoryKeyword} from "../../models/history-keyword"


const history = new HistoryKeyword()

Page({


    data: {
        historyTags: Array
    },

    onLoad: function(option) {
        const historyTags = history.get()
        this.setData({
            historyTags
        })
    },

    onSearch(event) {
        const keyWord = event.detail.value
        history.save(keyWord)
        this.setData({
            historyTags: history.get()
        })
    },

    onDeleteHistory(event) {
        history.clear()
        this.setData({
            historyTags: []
        })
    }

})