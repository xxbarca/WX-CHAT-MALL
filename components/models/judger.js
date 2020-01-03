import {SkuCode} from "./sku-code";
import {CellTagStatue} from "../../core/enum";
import {Cell} from "./cell";

class Judger {

    fenceGroup
    pathDict = []

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
    }

    _initPathDict() {
        this.fenceGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
    }

    //
    judge(cell, x, y) {
        this._changeCellStatue(cell, x, y)
    }

    _changeCellStatue(cell, x, y) {
        if (cell.status === CellTagStatue.WAITING) {
            // cell.status = CellTagStatue.SELECTED
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.SELECTED
        }
        if (cell.status === CellTagStatue.SELECTED) {
            // cell.status = CellTagStatue.WAITING
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.WAITING
        }
    }
}

export {
    Judger
}