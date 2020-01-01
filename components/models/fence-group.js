import {Matrix} from "./matrix";
import {Fence} from "./fence";


class FenceGroup {
    spu
    skuList = []
    fences = []
    constructor(spu) {
       this.spu = spu;
       this.skuList = spu.sku_list
    }
    initFences1() {
        const martix = this._createMatrix(this.skuList)
        //
        const fences = []
        // 当列号发生改变则为一个新的fence
        let currentJ = -1
        martix.each((element, i, j) => {
            if(currentJ !== j) {
                // 开启一个新列, 需要创建一个新的fence
                currentJ = j
                fences[currentJ] = this._createFence(element)
            }
            fences[currentJ].pushValueTitle(element.value)
        })
    }

    initFences() {
        const martix = this._createMatrix(this.skuList)
        //
        const fences = []
        const AT = martix.transpose()
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
        console.log(fences)
    }

    _createFence(element) {
        const fence = new Fence()
        return fence
    }

    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })

        return new Matrix(m)
    }

}

export {
    FenceGroup
}