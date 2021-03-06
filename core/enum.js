const CellTagStatus = {
    FORBIDDEN: "forbidden",
    SELECTED: "selected",
    WAITING: "waiting"
}

const ShoppingWay = {
    CART: 'cart',
    BUY: 'buy'
}

const SpuListType = {
	THEME: 'theme',
	ROOT_CATEGORY: 'root_category',
	SUB_CATEGORY: 'sub_category',
	LATEST: 'latest'
}

const AuthAddress = {
	NOT_AUTH: "not_auth",
	DENY: "deny",
	AUTHORIZED: "authorized"
}

const OrderExceptionType = {
	BEYOND_STOCK: 'beyond_stock',
	BEYOND_SKU_MAX_COUNT: 'beyond_sku_max_count',
	BEYOND_ITEM_MAX_COUNT: 'beyond_item_max_count',
	SOLD_OUT: 'sold_out',
	NOT_ON_SALE: 'not_on_sale',
	EMPTY: 'empty'
}

const CouponCenterType = {
	// 通过首页活动进入
	ACTIVITY: "activity",
	// 分类方式进入(商品详情进入)
	SPU_CATEGORY: "spu_category"
}


const CouponStatus = {
	CAN_COLLECT: 0,
	AVAILABLE: 1,
	USED: 2,
	EXPIRED: 3
}

const CouponType = {
	FULL_MINUS: 1, // 满减
	FULL_OFF: 2, // 满折
	NO_THRESHOLD_MINUS: 3 // 没有门槛
}

const CouponOperate = {
	UNPICK: "unpick",
	PICK: "pick"
}

const OrderStatus = {
	ALL: 0,
	UNPAID: 1,
	PAID: 2,
	DELIVERED: 3,
	FINISHED: 4,
	CANCELED: 5,
}

const BannerItemType = {
	SPU: 1,
	THEME: 2,
	SPU_LIST: 3
}

export {
    CellTagStatus,
    ShoppingWay,
	SpuListType,
	AuthAddress,
	OrderExceptionType,
	CouponCenterType,
	CouponStatus,
	CouponType,
	CouponOperate,
	OrderStatus,
	BannerItemType
}
