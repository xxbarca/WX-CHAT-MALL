import {config} from "../config/config"
import {promisic} from "../utils/util"

class Token {
	
	constructor() {
		this.tokenUrl = `${config.apiBaseUrl}/token`
		this.verifyUrl = `${config.apiBaseUrl}/token/verify`
	}
	
	/**
	 * 校验当前缓存中的token是否可用
	 * */
	async verify() {
		const token = wx.getStorageSync("token")
		//
		if (!token) {
			// 不存在
			await this.getTokenFromServer()
		} else {
			// 验证是否合法
			await this._verifyFromServer(token)
		}
	}
	
	async getTokenFromServer() {
		const r = await wx.login()
		const res = await promisic(wx.request)({
			url: this.tokenUrl,
			method: "POST",
			data: {
				account: r.code,
				type: 0
			},
			success(res) {
				console.log(res)
			}
		})
		console.log(res)
		wx.setStorageSync("token", res.data.token)
		return res.data.token
	}
	
	async _verifyFromServer(token) {
		const res = await promisic(wx.request)({
			url: this.verifyUrl,
			method: "POST",
			data: {
				token
			}
		})
		console.log(res)
	}
	
}

export {
	Token
}
