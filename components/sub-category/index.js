Component({

    properties: {
        categories: Array,
        bannerImg: String
    },

    data: {

    },

    methods: {
	    onTapGridItem(event) {
		    // const id = event.detail.key
		    const id = event.target.dataset.id
		    this.triggerEvent('itemtap', {
			    cid: id
		    })
	    }
    }
})
