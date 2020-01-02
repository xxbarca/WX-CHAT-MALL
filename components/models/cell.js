/**
 * 规格值
 * */
import {CellTagStatue} from "../../core/enum";


class Cell {
    title
    id

    status = CellTagStatue.WAITING

    constructor(spec) {
        this.title = spec.value
        this.id = spec.value_id
    }
}

export {
    Cell
}