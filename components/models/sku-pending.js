

class SkuPending {

    pending = []

    constructor() {

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

}

export {
    SkuPending
}