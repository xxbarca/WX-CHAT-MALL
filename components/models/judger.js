import { SkuCode } from "./sku-code";
import { CellTagStatus } from "../../core/enum";
import { SkuPending } from "./sku-pending";
import { Joiner } from '../../utils/joiner'
import {Cell} from "./cell";

class Judger {

    fenceGroup
    pathDict = []
	// 记录用户选择的规格值
    skuPending

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this._initPathDict()
        this._initSkuPending()
    }

    /**
     * 检查是否选择了完整的sku
     * */
    isSkuIntact() {
        return this.skuPending.isIntact()
    }

    //
    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues()
    }

    //
    getMissingKeys() {
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })
    }

    /**
     * 设置默认规格
     * */
    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
	    // 查看是否有默认的Sku
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
	    this.skuPending.init(defaultSku)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    /**
     * 设置默认选中的cell
     * */
    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellTagStatus.SELECTED)
        })
    }

    /**
     * 计算潜在路径
     * */
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
            this._changeCurrentCellStatus(cell, x, y)
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

    /**
     * 获取cell潜在路径
     * */
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
                	// 有已选元素则添加, 否则什么也不做
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellTagStatus.WAITING) {
            // this.fenceGroup.fences[x].cells[y].status = CellTagStatus.SELECTED
            this.fenceGroup.setCellStatusByXY(x, y, CellTagStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
	        // console.log(this.fenceGroup)
	        // console.log(this.skuPending)
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
