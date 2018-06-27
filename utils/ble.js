var serviceId = '0000FEE7-0000-1000-8000-00805F9B34FB'
var wirteCharacteristicId = '000036F5-0000-1000-8000-00805F9B34FB'
var notiyCharacteristicId = '000036F6-0000-1000-8000-00805F9B34FB'
var deviceId
var Dec = require('aesUnits.js');

class Bluetooth {

  static openBleAdapter() {
    wx.openBluetoothAdapter({
      success: function(res) {
        console.log("成功打开蓝牙")
      },
      fail: function(res) {
        wx.showToast({
          title: '蓝牙未开启',
          icon: 'none'
        })
      },
      complete: function(res) {

      },
    })

  }

  //连接蓝牙设备 包括判断设备状态 发现设备 连接UUID为['FEE7']的设备 
  //读取服务 特征值 监听notify过程
  static connectToDevice({
    success: call
  }) {
    //开启蓝牙 判断状态
    wx.getBluetoothAdapterState({
      success: function(res) {
        console.log("成功获取蓝牙状态")
        //开始发现设备
        wx.startBluetoothDevicesDiscovery({
          services: ['FEE7'],
          allowDuplicatesKey: true,
          interval: 0,
          success: function(res) {
            console.log("开始发现设备")
          },
          fail: function(res) {
            console.log("无法开始发现设备")
          },
          complete: function(res) {
            console.log("开始发现设备")
          },
        })

        //监听找到设备
        wx.onBluetoothDeviceFound(function(res) {
          res.devices.forEach(function(item, idx) {
            console.log("找到设备 " + item.name)
            deviceId = item.deviceId
            //停止扫描
            wx.stopBluetoothDevicesDiscovery({
              success: function(res) {
                console.log("停止搜索设备")
              },
            })
            wx.createBLEConnection({
              deviceId: item.deviceId,
              success: function(res) {
                //查询服务 代码可以注释
                wx.getBLEDeviceServices({
                  deviceId: item.deviceId,
                  success: function(res) {
                    wx.getBLEDeviceCharacteristics({
                      deviceId: item.deviceId,
                      serviceId: serviceId,
                      success: function(res) {
                        console.log("成功读取特征值")
                        //添加notify监听
                        wx.notifyBLECharacteristicValueChange({
                          deviceId: deviceId,
                          serviceId: serviceId,
                          characteristicId: notiyCharacteristicId,
                          state: true,
                          success: function(res) {
                            console.log("开启notify成功")
                            call(item)
                          },
                          fail: function(res) {
                            console.log(res.errMsg)
                          }
                        })

                        // ArrayBuffer转16进度字符串示例
                        function ab2hex(buffer) {
                          var hexArr = Array.prototype.map.call(
                            new Uint8Array(buffer),
                            function(bit) {
                              return ('00' + bit.toString(16)).slice(-2)
                            }
                          )
                          return hexArr.join('');
                        }

                        wx.onBLECharacteristicValueChange(function(res) {
                          console.log(`notify通道发生改变 通道ID -> ${res.characteristicId}`)
                          var resStr = Dec.Decrypt(ab2hex(res.value))
                          console.log("接收数据 => " + resStr)
                          //token上报标识头 060207
                          if (resStr.indexOf("060207") == 0) {
                            //获取到的token
                            getApp().token = resStr.substring(6, 14)
                            console.log("读取到Token值 -> " + getApp().token)
                          }
                          //获取到IMEI
                          if(resStr.indexOf("fa0606") == 0){
                            console.log("读取到IMEI值 -> " + resStr.substring(8, 24))
                          }

                          if(resStr.indexOf("020201") == 0){
                            console.log("读取到电量 ->" + resStr.substring(6, 8))
                          }
                        })
                      },
                      fail: function(res) {
                        console.log(res.errMsg)
                      }
                    })
                  },
                })
              },
              fail: function(res) {
                console.log(res.errMsg)
              }
            })
          })

        })
      },
      fail: function(res) {
        console.log("获取状态失败" + res.errMsg)
      }
    })
  }

  static disconnect() {
    wx.closeBLEConnection({
      deviceId: deviceId,
      success: function (res) { 
        console.log("成功断开连接")
      },
    })
  }
  //发送蓝牙数据
  static sendMsg(hex) {
    console.log("发送数据 HexString -> " + hex)
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h) {
      return parseInt(h, 16)
    }))
    console.log("发送数据 加密后数组 -> " + typedArray)
    var buffer = typedArray.buffer

    wx.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: wirteCharacteristicId,
      value: buffer,
      success: function(res) {
        console.log("写入成功")
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  }

  //回调测试接口
  static getId({
    deviceId: id,
    callBack: call
  }) {
    call(id)
  }
}




module.exports = Bluetooth