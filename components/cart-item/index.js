// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku"
import {Cart} from "../../models/cart"
const cart = new Cart()
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
	    onOutNumber: function() {},
	
	    onSelectCount: function(event) {
	    	let newCount = event.detail.count
			cart.replaceItemCount(this.properties.cartItem.skuId, newCount)
		
		    this.triggerEvent("countfloat")
	    },
	    
	    /**
	     * 删除
	     * */
	    onDelete: function (event) {
			const skuId = this.properties.cartItem.skuId
		    
		    cart.removeItem(skuId)
		    this.setData({
			    cartItem: null
		    })
		    
		    this.triggerEvent("itemdelete", {
		    	skuId
		    })
	    },
	
	    /**
	     * 选择
	     * */
	    checkItem: function (event) {
	    	const checked = event.detail.checked
		    cart.checkItem(this.properties.cartItem.skuId)
		    this.properties.cartItem.checked = checked
		    this.triggerEvent("itemcheck", {
			    skuId: this.properties.cartItem.skuId
		    })
	    }
    }
})
