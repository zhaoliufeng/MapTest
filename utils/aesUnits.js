var CryptoJS = require('aes.js'); //引用AES源码js
var OpOrder = require('op.js');

//这里是加密所需要的key
var key_Int = new Int8Array([32, 87, 47, 82, 54, 75, 63, 71, 48, 80, 65, 88, 17, 99, 45, 43]);

var getTokenArr = new Int8Array([6, 1, 1, 1, 54, 75, 63, 71, 48, 80, 65, 88, 17, 99, 45, 43]);
var keyBytes = Int8parse(key_Int); // 数据解析

//解密方法
function Decrypt(word) {
  var decrypt = CryptoJS.AES.decrypt(word, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
  });

  return CryptoJS.enc.Hex.stringify(decrypt).toString();
}
//加密方法
function Encrypt(srcs_Int) {
  var srcsBytes = Int8parse(srcs_Int); // 数据解析
  var encrypted = CryptoJS.AES.encrypt(srcsBytes, keyBytes, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding
  });

  return encrypted.toString();
}

function Int8parse(u8arr) {
  // Shortcut
  var len = u8arr.length;

  // Convert
  var words = [];
  for (var i = 0; i < len; i++) {
    words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
  }

  return CryptoJS.lib.WordArray.create(words, len);
}

//NoPadding
CryptoJS.pad.NoPadding = {
  pad: function() {},

  unpad: function() {}
};

//ECB模式
CryptoJS.mode.ECB = (function() {
  var ECB = CryptoJS.lib.BlockCipherMode.extend();

  ECB.Encryptor = ECB.extend({
    processBlock: function(words, offset) {
      this._cipher.encryptBlock(words, offset);
    }
  });

  ECB.Decryptor = ECB.extend({
    processBlock: function(words, offset) {
      this._cipher.decryptBlock(words, offset);
    }
  });

  return ECB;
}());

//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;