// pages/recommend/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novelList: [],
    page: 1,
    pageSize: 10,
    pageCount: 1,
    more: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
  /**
   * 请求推荐列表
   */
  getData: function () {
    wx.request({
      url: 'https://m.yuedu.163.com/column/1002/data.json',
      data: {
        page: this.data.page,
        pageSize: this.data.pageSize,
      },
      success: (res) => {
        let data = res.data.data,
          novelList = this.data.novelList
        this.setData({
          novelList: novelList.concat(data.books),
          more: data.pageQuery.more
        })
      }
    })
  },
  goDetail: function (e) {
    let book = e.currentTarget.dataset.book
    let app = getApp()
    app.globalData.currentBook = {
      bookId: book.sourceUrl.substr(8)
    }
    wx.navigateTo({ url: "/pages/detail/detail" })
  },
  /**
   * 下拉加载更多
   */
  lodaMore: function () {
    if (this.data.more) {
      this.setData({ page: this.data.page + 1 })
      this.getData()
    }
  }
})