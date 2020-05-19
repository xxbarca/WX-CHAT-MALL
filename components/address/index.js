// components/address/index.js
import {Address} from "../../models/address"
import {AuthAddress} from "../../core/enum"

Component({
 
    properties: {

    },

    data: {
	    hasChosen: false,
	    address: Object,
	    showDialog: false
    },
	
	lifetimes: {
    	attached() {
    		const address = Address.getLocal()
		    if (address) {
		    	this.setData({
				    address: address,
				    hasChosen: true
			    })
		    }
	    }
	},

    methods: {
	    onDialogConfirm() {
		    wx.openSetting({})
	    },
	    async onChooseAddress(event) {
	    	const authStatus = await this.hasAuthorizedAddress()
		    if (authStatus === AuthAddress.DENY) {
		    	this.setData({
				    showDialog: true
			    })
			    return
		    }
	    	this.getUserAddress()
	    },
	    async getUserAddress() {
	    	let res;
	    	try {
	    		res = await wx.chooseAddress({})
			    Address.setLocal(res)
		    } catch (e) {
			   console.error(e)
		    }
		    if (res) {
		    	this.setData({
				    address: res,
				    hasChosen: true
			    })
		    }
	    },
	    
	    async hasAuthorizedAddress() {
	    	const setting = await wx.getSetting({})
		    const addressSetting = setting.authSetting['scope.address']
		    
		    // 未授权
		    if (addressSetting === undefined) {
		    	return AuthAddress.NOT_AUTH
		    }
		    
		    // 拒绝授权
		    if (addressSetting === false) {
		        return AuthAddress.DENY
		    }
		    
		    // 授权
		    if (addressSetting === true) {
		    	return AuthAddress.AUTHORIZED
		    }
	    }
    }
})
