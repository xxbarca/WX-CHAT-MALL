// components/theme-janna/index.js
Component({
 
    properties: {
	    theme: Object
    },
	
    data: {
		h: null,
	    w: null,
	    topImg: null,
	    description: '',
	    spuList: []
    },
	
	observers: {
        'theme': function (theme) {
	        this.setData({
		        topImg: theme.extend,
		        descriptions: theme.description.split('#'),
		        spuList: theme.spu_list
	        })
        }
	},
  
    methods: {
	    onLoadImg(event) {
		    const {height, width} = event.detail
		    this.setData({
			    h: height,
			    w: width,
		    })
	    }
    }
})
