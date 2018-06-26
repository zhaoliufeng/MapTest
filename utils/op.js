//token令牌指令 
var getTokenArr = new Int8Array([6, 1, 1, 1, 54, 75, 63, 71, 48, 80, 65, 88, 17, 99, 45, 43]);

class OpOrder{
  //获取token令牌指令
  static getToken() {
    return getTokenArr
  }
}

module.exports = OpOrder