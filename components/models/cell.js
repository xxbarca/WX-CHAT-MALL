/**
 * 规格值
 * */
import {CellTagStatue} from "../../core/enum";


class Cell {
    title
    id

    status = CellTagStatue.WAITING
    spec

    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
        this.spec = spec
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}

export {
    Cell
}