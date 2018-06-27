// pages/my_parking/my_parking.js
Page({


  data: {
    showDialog: false
  },

  onLoad: function(options) {

  },
  onBind: function() {
    this.setData({
      showDialog: true
    })
  },
  onHideDialog: function(){
    this.setData({
      showDialog: false
    })
  }
})