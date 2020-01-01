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

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this.specs.forEach(s => {
            const cell = new Cell(s)
            this.cells.push(cell)
        })

    }
}

export {
    Fence
}