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

    // 获取默认的sku
    getDefaultSku() {
        const defaultSkuId = this.spu.default_sku_id
        if (!defaultSkuId) {
            return
        }
        return this.skuList.find(s => s.id === defaultSkuId)
    }

    getSku(skuCode) {
        const sku = this.spu.sku_list.find(s => s.code === skuCode)
        return sku ? sku : null
    }

    // 设置默认 状态 通过 id
    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status
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
    }

    eachCell(callback) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                callback(cell, i, j)
            }
        }
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