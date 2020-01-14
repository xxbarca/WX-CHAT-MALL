import {FenceGroup} from "../models/fence-group";import {Judger} from "../models/judger";import {Spu} from "../../models/spu"import {Cell} from "../models/cell"import {Cart} from "../../models/cart"Component({    properties: {        spu: Object    },    data: {        fences: Array,        judger: Object,        previewImg: String,        title: String,        price: String,        discountPrice: String,        stock: String,        // 表示是否有规格        noSpec: Boolean,        // 是否选择了完整的sku        skuIntact: Boolean,        //        currentValues: Array,        //        missingKeys: Array,        outStock: Boolean,        // 用户购买的商品数量        currentSkuCount: Cart.SKU_MIN_COUNT    },    observers: {        'spu': function (spu) {            if (!spu) {                return            }            if (Spu.isNoSpec(spu)) {                // 无规格                this.processNoSpec(spu)            } else {                // 有规格                this.processHasSpec(spu)            }        }    },    methods: {        processNoSpec(spu) {            this.setData({                noSpec: true,            })            this.bindSkuData(spu.sku_list[0])        },        processHasSpec(spu) {            const fenceGroup = new FenceGroup(spu)            fenceGroup.initFences()            const judger = new Judger(fenceGroup)            this.data.judger = judger            const defaultSku = fenceGroup.getDefaultSku()            if (defaultSku) {                this.bindSkuData(defaultSku)                //                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)            } else {                this.bindSpuData()            }            this.bindTipData()            this.bindFenceGroupData(fenceGroup)        },        // 如果默认spu不存在        bindSpuData() {            const spu = this.properties.spu            this.setData({                previewImg: spu.img,                title: spu.title,                price: spu.price,                discountPrice: spu.discount_price,            })        },        // 如果默认spu存在        bindSkuData(sku) {            this.setData({                previewImg: sku.img,                title: sku.title,                price: sku.price,                discountPrice: sku.discount_price,                stock: sku.stock,            })        },        bindTipData() {            this.setData({                skuIntact: this.data.judger.isSkuIntact(),                currentValues: this.data.judger.getCurrentValues(),                missingKeys: this.data.judger.getMissingKeys()            })        },        bindFenceGroupData(fenceGroup) {            this.setData({                fences: fenceGroup.fences,            })        },        //        setStockStatus(stock, currentCount) {            this.setData({                outStock: this.isOutOfStock(stock, currentCount)            })        },        // 库存量 当前用户购买的数量        isOutOfStock(stock, currentCount) {            return stock < currentCount        },        //        onSelectCount(event) {            const currentCount = event.detail.count            this.setData({                currentSkuCount: currentCount            })            if (this.data.judger.isSkuIntact()) {                const sku = this.data.judger.getDeterminateSku()                this.setStockStatus(sku.stock, currentCount)            }        },        onCelltap(event) {            const data = event.detail.cell            const x = event.detail.x            const y = event.detail.y            //            const cell = new Cell(data.spec)            cell.status = data.status            const judger = this.data.judger            judger.judge(cell, x, y)            // 点击之后, 上半部数据处理            const skuIntact = judger.isSkuIntact()            if (skuIntact) {                // 产生了完整的sku的情况下, 上半部分数据需要改变                const currentSku = judger.getDeterminateSku()                this.bindSkuData(currentSku)                // 判断库存量与购买量的关系                this.setStockStatus(currentSku.stock, this.data.currentSkuCount)            }            this.bindTipData()            this.bindFenceGroupData(judger.fenceGroup)        }    }})