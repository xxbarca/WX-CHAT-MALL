import {Cart} from "../../models/cart"

Component({

    properties: {
	    cartItemCount: Number
    },
	
    data: {
	   
    },


	onShow: function() {
 
	},
	
    methods: {
        onGoToHome(event) {
            this.triggerEvent('gotohome')
        },
        onGoToCart(event) {
            this.triggerEvent('gotocart')
        },
        onAddtoCart(event) {
            this.triggerEvent('addtocart')
        },
        onBuy(event) {
            this.triggerEvent('buy')
        }
    }
})
