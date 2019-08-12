// pages/detail.js
import { uniqueArray } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showloading: false,
    bookDetail: {},
    article: "",
    catalog: [],
    bookCatalogue: [],
    bookId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let app = getApp()
    let bookId = app.globalData.currentBook.bookId
    this.setData({
      showloading: true,
      bookId: bookId
    })
    wx.showLoading({
      title: "loading..."
    })
    wx.request({
      url: "https://m.yuedu.163.com/reader/book/info.json",
      data: {
        source_uuid: bookId,
      },
      success: res => {
        wx.hideLoading()
        this.setData({
          catalog: res.data.data.catalog,
          bookDetail: res.data.data.book,
          bookCatalogue: res.data.data.catalog.slice(0, 5),
          showloading: false
        })
      }
    })

  },
  goRead: function (event) {
    console.log(event.currentTarget.dataset.nowread)
    wx.getStorage({
      key: "bookcache",
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      },
      complete: (res) => {
        let arr = res.data ? res.data : []
        arr.push({ ...this.data.bookDetail, secIndex: event.currentTarget.dataset.nowread })
        wx.setStorage({
          key: "bookcache",
          data: uniqueArray(arr, "title"),
          success: (res) => {
            wx.navigateTo({ url: "/pages/bookRead/index?" + "index=" + event.currentTarget.dataset.nowread })
          }
        })
      },
    })
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

  },

})