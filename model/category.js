import { Http } from "../utils/http"

class Category {

    static locationB = 'b-1'

    static async getGridCategory() {
        return await Http.request({
            url: `/category/grid/all`,
        })
    }
}

export {
    Category
}
