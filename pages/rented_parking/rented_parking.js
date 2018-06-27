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
        // Ble.sendMsg(Dec.Encrypt(OpOrder.getToken()))

      }
    });
  },

  onLocked: function() {
    console.log('升锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.lock()))
  },

  onUnlocked: function() {
    console.log('降锁')
    Ble.sendMsg(Dec.Encrypt(OpOrder.unLock()))

  },

  onGetToken: function(){
    console.log('获取token')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getToken()))
  },

  onGetState: function(){
    console.log('获取锁状态')
    Ble.sendMsg(Dec.Encrypt(OpOrder.getState()))
  }

})