const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function isFunction(obj) {
  return typeof obj === 'function';
}
function uniqueArray(arr, key) {
  arr.reverse()
  var result = [];
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i][key]]) {
      result.push(arr[i]);
      obj[arr[i][key]] = true;
    }
  }
  return result
}
module.exports = {
  formatTime: formatTime,
  isFunction: isFunction,
  uniqueArray: uniqueArray
}
