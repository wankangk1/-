// pages/recommend/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: "",
        novelList: [],
        page: 1,
        pageSize: 10,
        nextPageLink: "",
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
    },
    goDetail: function (e) {
        let book = e.currentTarget.dataset.book
        let app = getApp()
        app.globalData.currentBook = {
            bookId: book.sourceUuid
        }
        wx.navigateTo({ url: "/pages/detail/detail" })
    },
    /**
     * 下拉加载更多
     */
    lodaMore: function () {
        if (this.data.nextPageLink) {
            this.setData({ page: this.data.page + 1 })
            this.getData()
        }
    },
    search: function (event) {
        this.setData({
            searchValue: event.detail.value,
            page: 1,
            nextPageLink: "",
            novelList: []
        })
        this.getData()
    },
    getData: function () {
        let params = {
            key: this.data.searchValue,
            page: this.data.page,
        }
        if (this.data.nextPageLink) {
            params.nextPageLink = this.data.nextPageLink
        }
        wx.request({
            url: 'https://m.yuedu.163.com/search/book/data.json',
            data: params,
            success: (res) => {
                let data = res.data.data,
                    novelList = this.data.novelList
                this.setData({
                    novelList: novelList.concat(data.books),
                    nextPageLink: data.nextPageLink
                })
            }
        })
    }
})