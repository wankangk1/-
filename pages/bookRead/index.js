// pages/bookRead/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId: "",
    book: {},
    catalog: [],
    config: {},
    nowRead: 0,
    content: "",
    contentId: "",
    nowScroll: 0,
    showLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nowRead: options.index * 1
    })
    this.getBook()
  },
  getBook: function () {
    let app = getApp()
    let bookId = app.globalData.currentBook.bookId
    wx.request({
      url: "https://m.yuedu.163.com/reader/book/info.json",
      data: {
        source_uuid: bookId
      },
      success: res => {
        this.setData({
          bookId: bookId,
          book: res.data.data.book,
          catalog: res.data.data.catalog,
          config: res.data.data.config,
          nowRead: this.data.nowRead
        })
        this.getContent()
      }
    })
  },
  getContent: function () {
    this.setData({
      showLoading: true
    })
    wx.showLoading({
      title: "loading..."
    })
    wx.request({
      url: "https://m.yuedu.163.com/reader/book/content.json",
      data: {
        source_uuid: this.data.bookId,
        content_uuid: this.data.catalog[this.data.nowRead].secId
      },
      success: res => {
        wx.hideLoading()
        this.setData({
          content: base64_decode(res.data.data.content),
          showLoading: false
        })
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      }
    })
  },
  lastSec: function () {
    this.setData({
      nowRead: this.data.nowRead - 1
    })
    this.getContent()
  },
  loadMore: function () {
    this.setData({
      nowRead: this.data.nowRead + 1
    })
    this.getContent()
  },
  readScroll: function (event) {
    console.log(event)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
function base64_decode(input) { // 解码，配合decodeURIComponent使用
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
    enc1 = base64EncodeChars.indexOf(input.charAt(i++));
    enc2 = base64EncodeChars.indexOf(input.charAt(i++));
    enc3 = base64EncodeChars.indexOf(input.charAt(i++));
    enc4 = base64EncodeChars.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  return utf8_decode(output);
}
function utf8_decode(utftext) { // utf-8解码
  var string = '';
  let i = 0;
  let c = 0;
  let c1 = 0;
  let c2 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c1 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
      i += 2;
    } else {
      c1 = utftext.charCodeAt(i + 1);
      c2 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63));
      i += 3;
    }
  }
  return string;
}

