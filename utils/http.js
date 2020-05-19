import { config } from "../config/config"
import { promisic } from "./util"
import {Token} from "../models/token"
import {codes} from "../config/exception-config"

class Http {

    static async request({url, data, method = 'GET'}) {
    	let res = null
        try {
    		res =  await promisic(wx.request) ({
		        url: `${config.apiBaseUrl}${url}`,
		        data,
		        method,
		        header: {
			        'content-type': 'application/json',
			        'authorization': `Bearer ${wx.getStorageSync('token')}`,
			        appkey: config.appkey,
			        clientkey: config.clientkey
		        }
	        })
        } catch (e) {
	       Http.showError(-1)
        }
        const code = res.statusCode.toString()
	    if (code.startsWith('2')) {
	    	return res.data
	    } else {
	    	if (code === '401') {
	    		// 二次重发
			    if (data.refetch) {
				    Http._refresh({
					    url,
					    data,
					    method
				    })
			    }
		    }
	    }
        return res.data
    }
    
    static showError(error_code, serverError) {
    	let tip;
    	if (!error_code) {
    		tip = codes[9999]
	    } else {
    		if (codes[error_code] === undefined) {
    			tip = serverError.message
		    } else {
    			tip = codes[error_code]
		    }
	    }
    	
	    wx.showToast({
		    icon: 'none',
		    title: tip,
		    duration: 3000
	    })
    }
    
    static async _refresh(data) {
    	const token = new Token()
	    await token.getTokenFromServer()
	    data.refetch = false
	    return await Http.request(data)
    }
}


export {
    Http
}
