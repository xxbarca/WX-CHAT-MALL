import {SkuCode} from "./sku-code";
import {CellTagStatue} from "../../core/enum";

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

    //1. 当前cell不需要判断潜在路径
    //2. 对于某个cell, 它的潜在路径应该是他自己加上其他已选cell
    //3. 对于某个cell, 不需要考虑当前行其他cell是否已选
    judge(cell, x, y) {
        this._changeCurrentCellStatue(cell, x, y)
        this.fenceGroup.eachCell(this._changeOtherCellStatus)
    }

    _changeOtherCellStatus(cell, x, y) {

    }

    //
    _findPotentialPath(cell, x, y) {}

    _changeCurrentCellStatue(cell, x, y) {
        if (cell.status === CellTagStatue.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.SELECTED
        }
        if (cell.status === CellTagStatue.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.WAITING
        }
    }
}

export {
    Judger
}