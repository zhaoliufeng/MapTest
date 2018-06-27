//index.js
//获取应用实例
var amapFile = require('../../libs/amap-wx.js')
var amap = require('../../utils/amap.js')

var markersData = [];
var mapCtx;
Page({
  data: {
    markers: [{
      latitude: '22.55329',
      longitude: '113.88308',
      iconPath:'../../img/poi_selected.png',
      width:18,
      height:27
    },{
        latitude: '22.55729',
        longitude: '113.88908',
        iconPath: '../../img/poi_selected.png',
        width: 18,
        height: 27
    }],
    cicle:[{
      latitude:'39.92',
      longitude: '116.46',
      color:'ffffffff',
      fillColor:'7f000000',
      radius:2000,
      strokeWidth:'3'
    }],
    latitude: '22.55329',
    longitude: '113.88308',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
  
  },
  onLoad: function () {
    var that = this;
    this.mapCtx = wx.createMapContext('map');
  
  },

//定位当前终端位置
  onLocate:function(){
    var that = this
    //请求当前位置
    wx:wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          //修改范围圆的中心坐标
          cicle:[{
            latitude: res.latitude,
            longitude: res.longitude,
            color: 'ffffffff',
            fillColor: '#7cb5ec88',
            radius: 2000,
            strokeWidth: '3'
          }]
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //输入查找地点
  onFindPlace:function(){
    //跳转搜索
  },

  mapDrag:function(){
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log('中心点纬度 ：' + res.longitude)
        console.log('中心点经度 ：' + res.latitude)
        that.setData({
          cicle: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: 'ffffffff',
            fillColor: '#7cb5ec88',
            radius: 2000,
            strokeWidth: '3'
          }]
        })
      }
    })
  }
})
