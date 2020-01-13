import { SkuCode } from "./sku-code";
import { CellTagStatus } from "../../core/enum";
import { SkuPending } from "./sku-pending";
import { Joiner } from '../../utils/joiner'
import {Cell} from "./cell";

class Judger {

    fenceGroup
    pathDict = []
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact() {
        return this.skuPending.isIntact()
    }

    // 默认规格
    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    // 设置默认选中的cell
    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellTagStatus.SELECTED)
        })
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
    judge(cell, x, y, isInit = false) {
        // 是否初始化的时候调用
        if (!isInit) {
            // 用户不点击不存在 cell, x, y, 用户点击才需要调用
            this._changeCurrentCellStatue(cell, x, y)
        }
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            const isIn = this._isInDict(path)
            if (isIn) {
                // this.fenceGroup.fences[x].cells[y].status = CellTagStatus.WAITING
                this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.WAITING)
            } else {
                // this.fenceGroup.fences[x].cells[y].status = CellTagStatus.FORBIDDEN
                this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.FORBIDDEN)
            }
        })
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSku(code)
        return sku
    }

    _isInDict(path) {
        return this.pathDict.includes(path)
    }

    // TODO
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
        if (cell.status === CellTagStatus.WAITING) {
            // this.fenceGroup.fences[x].cells[y].status = CellTagStatus.SELECTED
            this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        }
        if (cell.status === CellTagStatus.SELECTED) {
            // this.fenceGroup.fences[x].cells[y].status = CellTagStatus.WAITING
            this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }
}

export {
    Judger
}