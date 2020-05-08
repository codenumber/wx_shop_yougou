// pages/cart/cart.js
import {requestPayment,showToast} from '../../utils/asyncWx.js'
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    total: 0
  },
  setDataValue(cart) {
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price*v.num
        totalNum += v.num
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },
  async toPay() {
    try {
      const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.address.all
    let goods = []
    this.data.cart.forEach(v => {
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      })
    })
    const data = {order_price, consignee_addr, goods}
    const res = await request({url: '/my/orders/create',method: 'POST', data })
    if (res.data.meta.status !== 200) return  showToast("获取数据失败")
    const {order_number} = res.data.message
    const {data: {message: {pay}},data:{meta}} = await request({url: '/my/orders/req_unifiedorder',  method:'POST',  data: {order_number}})
    if (meta.status !== 200) return  showToast("获取数据失败")
    //此时支付可以扫码，但是固定失败，因为APPID与自己个人后台
    await requestPayment(pay) 
    //逻辑进行变化，正常是支付成功跳转，但是因为不可能支付成功，因此不做支付跳转
    await showToast("支付成功")
    wx.navigateTo({
      url: '../order/order',
    })
    成功进行支付成功的数据删除
    const cart = wx.getStorageSync('cart').filter(v => !v.checked)
    wx.setStorageSync('cart', cart)
  } catch (error) {
      //失败后直接跳转到订单页
      await showToast("支付失败")
      wx.navigateTo({
        url: '../order/order',
      })
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
    const cart = wx.getStorageSync('cart').filter(v => v.checked)
    this.setData({address})
    this.setDataValue(cart)
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