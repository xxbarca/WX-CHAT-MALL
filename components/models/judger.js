import { SkuCode } from "./sku-code";
import { CellTagStatue } from "../../core/enum";
import { SkuPending } from "./sku-pending";
import { Joiner } from '../../utils/joiner'

class Judger {

    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initSkuPending()
        this._initPathDict()
    }

    _initSkuPending() {
        this.skuPending = new SkuPending()
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
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            // console.log(path)
            const isIn = this._isInDict(path)
            console.log(`path=${path}, isIn=${isIn}`)
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status = CellTagStatue.WAITING
            } else {
                this.fenceGroup.fences[x].cells[y].status = CellTagStatue.FORBIDDEN
            }
        })
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }
    //
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner("#")
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                // 是当前行 cell id 1-42
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 非当前行
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                } else {

                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatue(cell, x, y) {
        if (cell.status === CellTagStatue.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.SELECTED
            this.skuPending.insertCell(cell, x)
        }
        if (cell.status === CellTagStatue.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellTagStatue.WAITING
            this.skuPending.removeCell(x)
        }
    }
}

export {
    Judger
}