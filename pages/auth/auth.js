// pages/auth/auth.js
import {getLogin} from '../../utils/asyncWx.js'
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleUserInfo(e) {
    console.log(e)
    try {
      const {encryptedData, rawData, iv, signature,userInfo} = e.detail
    const {code} = await getLogin()
    const data = {encryptedData, rawData, iv, signature,code}
    const res = await request({url:'/users/wxlogin',method: "POST",data})
    //页面的请求是无效的，因为这个需要企业级id与接口开放，借用一个提供的token
    //如果用户拒绝登录，那就不应该设置token
    if (userInfo) {
      wx.setStorageSync('userInfo',userInfo)
      wx.setStorageSync('token',"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
    }
    wx.navigateBack()
  } catch(err) {
      console.log(err)
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