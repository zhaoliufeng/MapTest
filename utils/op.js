//token令牌指令 
var getTokenArr = new Int8Array([6, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
// var getTokenArr = new Int8Array([6, 1, 1, 1, 45, 26, 104, 61, 72, 39, 26, 24, 49, 110, 71, 26]);
//降锁
var unLockArr = new Int8Array([5, 1, 6, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0])
//升锁
var lockArr = new Int8Array([5, 12, 1, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0])

//获取锁状态
var lockState = new Int8Array([5, 14, 1, 1, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0])

class OpOrder {
  //获取token令牌指令
  static getToken() {
    return getTokenArr
  }

  static unLock(){
    var tokenBytes = Str2Bytes(getApp().token)
    console.log(tokenBytes)
    unLockArr[9] = tokenBytes[0]
    unLockArr[10] = tokenBytes[1]
    unLockArr[11] = tokenBytes[2]
    unLockArr[12] = tokenBytes[3]
    console.log(unLockArr)
    return unLockArr
  }


  static lock(){
    var tokenBytes = Str2Bytes(getApp().token)
    console.log(tokenBytes)
    lockArr[9] = tokenBytes[0]
    lockArr[10] = tokenBytes[1]
    lockArr[11] = tokenBytes[2]
    lockArr[12] = tokenBytes[3]
    console.log(lockArr)
    return lockArr
  }

  static getState(){
    var tokenBytes = Str2Bytes(getApp().token)
    console.log(tokenBytes)
    lockState[4] = tokenBytes[0]
    lockState[5] = tokenBytes[1]
    lockState[6] = tokenBytes[2]
    lockState[7] = tokenBytes[3]
    console.log(lockState)
    return lockState
  }
 
}
//十六进制字符串转字节数组
function Str2Bytes(str) {
  var pos = 0;
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  len /= 2;
  var hexA = new Array();
  for (var i = 0; i < len; i++) {
    var s = str.substr(pos, 2);
    var v = parseInt(s, 16);
    hexA.push(v);
    pos += 2;
  }
  return hexA;
}

module.exports = OpOrder