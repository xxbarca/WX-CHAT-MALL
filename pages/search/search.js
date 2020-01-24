import {HistoryKeyword} from "../../models/history-keyword"
import {Tag} from "../../models/tag"


const history = new HistoryKeyword()

Page({


    data: {
        historyTags: Array,
        hotTags: Array
    },

    onLoad: async function(option) {
        const historyTags = history.get()
        const hotTags = await Tag.getSearchTags()
        this.setData({
            historyTags,
            hotTags
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