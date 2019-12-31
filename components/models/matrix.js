
class Matrix {
    martix
    constructor(martix) {
        this.martix = martix
    }

    get rowsNum() {
        return this.martix.length
    }

    get colsNum() {
        return this.martix[0].length
    }

    forEach(callback) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.martix[i][j]
                callback(element, i, j)
            }
        }
    }

    transpose() {
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.martix[i][j]
            }
        }
        return desArr
    }
}

export {
    Matrix
}