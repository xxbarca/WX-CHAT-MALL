/**
 * 记录已选的cell
 * */
import {Cell} from "./cell";


class SkuPending {

    pending = []
    // 表示完整的sku应该有的规格数
    size

    constructor(size) {
        this.size = size
    }

    init(sku) {
        // this.size = sku.specs.length
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    // 检查是否选择了完整的sku
    isIntact() {
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

    // x: 行号, 0, 1, 2 ...
    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(x) {
        this.pending[x] = null
    }

    // 
    findSelectedCellByX(x) {
        return this.pending[x]
    }
    
    //
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }

}

export {
    SkuPending
}