// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku"
import {Cart} from "../../models/cart"

Component({
  
    properties: {
		cartItem: Object
    },

	onShow: function() {
	},
  
    data: {
		online: Boolean,
	    soldOut: Boolean,
	    discount: Boolean,
	    specStr: String,
	    stock: Cart.SKU_MAX_COUNT,
	    skuCount: 1,
    },
	
	observers: {
		cartItem: function (cartItem) {
			if (!cartItem) {
				return
			}
			const specStr = parseSpecValue(cartItem.sku.specs)
			const discount = cartItem.sku.discount_price ? true : false
			const soldOut = Cart.isSoldOut(cartItem)
			const online = Cart.isOnline(cartItem)
			const skuCount = cartItem.count
			const stock = cartItem.sku.stock
			
			this.setData({
				online,
				soldOut,
				discount,
				specStr,
				skuCount,
				stock
			})
			
		}
	},

  
    methods: {
	    onDelete: function (event) {
			const skuId = this.properties.cartItem.skuId
		    const cart = new Cart()
		    cart.removeItem(skuId)
		    this.setData({
			    cartItem: null
		    })
		    
		    this.triggerEvent("itemdelete", {
		    	skuId
		    })
	    }
    }
})
