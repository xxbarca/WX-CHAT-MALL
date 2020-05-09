//app.js
import {Cart} from "./models/cart"

App({
	onLaunch: function () {
		//
		const cart = new Cart()
		console.log(cart.isEmpty())
		if (!cart.isEmpty()) {
			wx.showTabBarRedDot({
				index: 2
			})
		}
  },
	globalData: {
		userInfo: null
	}
})
