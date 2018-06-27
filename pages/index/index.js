//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../libs/amap-wx.js')
var amap = require('../../utils/amap.js')
//当前显示信息的marker id
var showMarkerId;
var mapCtx;
Page({
  data: {
    markers: [{
      latitude: '22.55329',
      longitude: '113.88308',
      iconPath: '../../img/poi_selected.png',
      id: 1,
      width: 18,
      height: 27
    }, {
      latitude: '22.55329',
      longitude: '113.89308',
      iconPath: '../../img/poi_selected.png',
      id: 2,
      width: 18,
      height: 27
    }],
    cicle: [{
      latitude: '26.55329',
      longitude: '113.88308',
      color: 'ffffffff',
      fillColor: '7cb5ec88',
      radius: 2000,
      strokeWidth: '3'
    }],
    showLockInfo: false,
    scale: 14,
    latitude: '22.55329',
    longitude: '113.88308',
    locatMarginTop: '-180rpx',
    textData: {}
  },

  //地图marker点击事件
  makertap: function(e) {
    console.log('marker tap ' + e.markerId)
    if (!this.data.showLockInfo) {
      this.setData({
        locatMarginTop: '-360rpx',
        showLockInfo: true
      })
    }
  },

  maptap:function(){
    //点击地图 如果显示了锁的详情信息则收起
    if (this.data.showLockInfo) {
      this.setData({
        locatMarginTop: '-180rpx',
        showLockInfo: false
      })
    }
  },

  onLoad: function() {
    var that = this;
    this.mapCtx = wx.createMapContext('map');
    this.onLocate();
  },

  //定位当前终端位置
  onLocate: function() {
    var that = this
    //请求当前位置
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 14,
          //修改范围圆的中心坐标
          cicle: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: 'ffffffff',
            fillColor: '#7cb5ec88',
            radius: 2000,
            strokeWidth: '3'
          }]
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '定位失败',
          icon: 'none'
        })
      },
      complete: function(res) {},
    })
  },

  //输入查找地点
  onFindPlace: function() {
    //跳转搜索
  },

  /**
   * 拖动地图触发
   */
  mapDrag: function() {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function(res) {
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