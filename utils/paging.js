import { Http } from "./http"

class Paging {

    start
    count
    req
    locker = false
    url

    constructor(req,  count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }
    
    getMoreDate() {
        if (this._getLocker()) {
            return
        }
        this._actualGetData()
        this._releaseLocker()
    }

    _actualGetData() {
        Http.request({})
    }

    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        // url = /v1/spu/latest + '?' + params
        // url = /v1/spu/latest?other=abc + '&' + params

        if(url.indexOf("?") !== -1) {
            url += '&' + params
        } else {
            url += "?" + params
        }
        this.req.url = url
        return this.req
    }



    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }

}