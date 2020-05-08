// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: '1',
        value: '商品收藏',
        isActive: true
      },
      {
        id: '2',
        value: '品牌收藏',
        isActive: false
      },
      {
        id: '3',
        value: '店铺收藏',
        isActive: false
      },
      {
        id: '4',
        value: '浏览量足迹',
        isActive: false
      }
    ],
    goodsList: []
  },
  changItemIndex(e) {
    const {index} = e.detail
    this.data.tabs.forEach((v,i) => i === index ? v.isActive = true:v.isActive = false)
    this.setData({
      tabs: this.data.tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      goodsList: collect
    })
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