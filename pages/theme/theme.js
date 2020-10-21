// pages/theme/theme.js
import {Banner} from "../../models/banner"
import {Theme} from "../../models/theme"

Page({
	
    data: {
	    _noResource: false,
	    _theme: null,
	    _tplName: ''
    },
    onLoad: async function (options) {
    	const theme = await Theme.getThemeSpuByName(options.name)
	    
	    this.setData({
		    _theme: theme,
		    _tplName: theme.tpl_name,
	    })
    }
	
})
