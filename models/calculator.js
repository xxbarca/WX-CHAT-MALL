
class Calculator {
	
	totalPrice = 0
	totalCount = 0
	
	cartItems = []
	
	constructor(cartItems) {
		this.cartItems = cartItems
	}
	
	calc() {
		this.cartItems.forEach(item => {
			this.push(item)
		})
	}
	
	getTotalPrice() {
		return this.totalPrice
	}
	
	getTotalSkuCount() {
		return this.totalCount
	}
	
	push(cartItem) {
		let partTotalPrice = 0
		if (cartItem.sku.discount_price) {
			partTotalPrice = cartItem.count * cartItem.sku.discount_price
		} else {
			partTotalPrice = cartItem.count * cartItem.sku.price
		}
		this.totalPrice += partTotalPrice
		this.totalCount += cartItem.count
	}
}

export {
	Calculator
}
