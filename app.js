//app.js
const util = require('./utils/util.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        console.log(res, "用户未授权")
      }
    })

  },
  getAccessToken: function () {
    wx.request({
      url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx20ae3eedb0e3699b&secret=11392b661b2befbdb7679a83c50e0ce9",
      success: res => {
        this.globalData.access_token = res.data.access_token
        wx.request({
          method: "POST",
          url: `https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=${res.data.access_token}`,
          data: {
            begin_date: "20190709",
            end_date: "20190709"
          },
          success: res => {
            console.log(res)
          }
        })
      }
    })
  },
  onShow: function () {

  },
  globalData: {
    userInfo: null,
    accessToken: ""
  }
})


