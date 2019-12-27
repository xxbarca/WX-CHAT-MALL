import { Http } from "../utils/http"

class Spu {

    static async getLatest() {
        return await Http.request({
            url: ``,
        })
    }
}

export {
    Spu
}
