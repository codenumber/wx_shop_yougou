// pages/cart/cart.js
import {getSetting, openSetting, chooseAddress} from '../../utils/asyncWx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}
  },
  async handleAdress() {
    try {
      const res = await getSetting()
      const scopeAdress = res.authSetting["scope.address"]
      if (scopeAdress === false ) {
        await openSetting()
      }
        let address = await chooseAddress()
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        wx.setStorageSync('address',address)
    } catch (error) {
        console.log(error)
    }
  
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
    const address = wx.getStorageSync('address')
    this.setData({
      address
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