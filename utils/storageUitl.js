
//用户登录
const KEY_USER_LOGIN = "key_user_login"
const KEY_USER_NAME = "key_user_name"

class StorageUtil{

  //保存用户登录状态
  static saveUserLoginState(isLogin){
    wx.setStorage({
      key: KEY_USER_LOGIN,
      data: isLogin,
      success: function(res) {
        console.log("保存用户登录状态成功 当前状态: " + isLogin)
      },
      fail: function(res) {
        console.log("保存用户登录状态失败 当前状态: " + isLogin)
      },
      complete: function(res) {},
    })
  }

  //获取用户登录状态
  static getUserLoginState(){
    wx:wx.getStorage({
      key: KEY_USER_LOGIN,
      success: function(res) {
        console.log("获取用户登录状态成功 当前状态: " + res.data)
        return res.data
      },
      fail: function(res) {
        console.log("获取用户登录状态失败 ErrorMsg " + res.errMsg)
      },
      complete: function(res) {},
    })
  }
}

module.exports = StorageUtil