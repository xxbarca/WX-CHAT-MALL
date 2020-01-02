

class SkuCode {

    code
    spuId
    segments = []

    constructor(code) {
        this.code = code
    }


    _splitToSegment() {
        // 2$1-45#3-9#4-14
        const spuAndSpec = this.code.split("$")
        this.spuId = spuAndSpec[0]

        const specCodeArray =spuAndSpec[1].split("#")
    }
}