// pages/rented_parking/rented_parking.js
var Dec = require('../../utils/aesUnits.js');
var OpOrder = require('../../utils/op.js');
var Ble = require('../../utils/ble.js');
Page({

  data: {

  },

  onLoad: function(options) {
    //判断蓝牙状态前需要先开启蓝牙
    Ble.openBleAdapter();
    Ble.connectToDevice({
      success: function(item) {
        console.log("连接设备 " + item.name + " 成功")
      }
    });
  },

  onLocked: function() {
    console.log('升锁')
    console.log(Dec.Encrypt(OpOrder.getToken()))
  },

  onUnlocked: function() {
    console.log('降锁')
    // Ble.getId(function(id){
    //   console.log(id)
    // })

    Ble.getId({
      deviceId: 2,
      callBack: function(id) {
        console.log(id)
      }
    })
  },
})