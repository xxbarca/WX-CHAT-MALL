import {Http} from "../utils/http";

class Spu {

    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && (spu.sku_list[0].specs === null || spu.sku_list[0].specs.length === 0)) {
            return true
        }
        return false
    }

    static getDetail(id) {
        return Http.request({
            url: `/spu/id/${id}/detail`
        })
    }
    
    static getByCategory(id, start = 0, count = 10) {
    	return Http.request({
		    url: `/spu/by/category/${id}?start=${start}&count=${count}`
	    })
    }
    
    static getLatestSpu(start = 0, count = 10) {
        return Http.request({
	        url: `/spu/latest?start=${start}&count=${count}`
        })
    }
}

export {
    Spu
}
