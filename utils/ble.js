var serviceId = '0000FEE7-0000-1000-8000-00805F9B34FB'
var wirteCharacteristicId = '000036F5-0000-1000-8000-00805F9B34FB'
var notiyCharacteristicId = '000036F6-0000-1000-8000-00805F9B34FB'
var deviceId

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
                if(call != undefined){
                  call(item)
                }
                
                //查询服务 代码可以注释
                wx.getBLEDeviceServices({
                  deviceId: item.deviceId,
                  success: function(res) {
                    wx.getBLEDeviceCharacteristics({
                      deviceId: item.deviceId,
                      serviceId: serviceId,
                      success: function(res) {
                        console.log("成功读取特征值 " + res.characteristics.toString())
                      },
                      fail: function(res) {
                        console.log(res.errMsg)
                      }
                    })
                  },
                })

                //添加notify监听
                wx.notifyBLECharacteristicValueChange({
                  deviceId: deviceId,
                  serviceId: serviceId,
                  characteristicId: notiyCharacteristicId,
                  state: true,
                  success: function(res) {},
                })

                wx.onBLECharacteristicValueChange(function(res) {
                  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
                  console.log(ab2hext(res.value))
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

  //发送蓝牙数据
  static sendMsg(hex) {
    if (deviceId == undefined) {
      console.log("deviceId为空，未连接设备")
      return
    }
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h) {
      return parseInt(h, 16)
    }))
    console.log(typedArray)
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


function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function(bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

module.exports = Bluetooth