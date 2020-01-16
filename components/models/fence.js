import {Cell} from "./cell";

/**
 * 规格名
 * */

class Fence {

    cells = []
    specs

    // 规格名
    title
    // 规格名主键
    id

    //{key_id: 1, key: "颜色", value_id: 45, value: "金属灰"}
    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }

    _initCells() {
        this.specs.forEach(s => {
            const existed = this.cells.some(c => {
                return c.id === s.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(cell => {

        })
    }

    _setCellSkuImg(cell, skuList) {}
}

export {
    Fence
}