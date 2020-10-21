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
			console.log(theme)
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
		    console.log(height,width)
		    this.setData({
			    h: height,
			    w: width,
		    })
	    }
    }
})
