
class CartItem {
	
	skuId = null
	count = 0
	sku = null
	checked = true
	
	constructor(sku, count) {
		this.count = count
		this.sku = sku
		this.skuId = sku.id
	}
}

export {
	CartItem
}
