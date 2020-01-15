
Component({

    properties: {

    },


    data: {

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
