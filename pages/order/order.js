// pages/order/order.js
import {request} from '../../request/index.js'
import { showToast } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: '1',
        value: '全部',
        isActive: true
      },
      {
        id: '2',
        value: '未付款',
        isActive: false
      },
      {
        id: '3',
        value: '待收货',
        isActive: false
      },
      {
        id: '4',
        value: '退货/退款',
        isActive: false
      }
    ],
    orderList: []
  },
  changTitleActive(index) {
    this.data.tabs.forEach((v,i) => i === index ? v.isActive = true:v.isActive = false)
    this.setData({
      tabs: this.data.tabs 
    })
  },
  changItemIndex(e) {
    const {index} = e.detail
    this.changTitleActive(index)
    this.getOrderList(index + 1)
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
    const pageList = getCurrentPages()
    const {type} = pageList[pageList.length-1].options
    this.changTitleActive(type-1)
    this.getOrderList(type)
  },
  async getOrderList(type) {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth',
      })
    }
    const {data:{meta},data:{message:{orders}}} = await request({url: '/my/orders/all',data: {type}})
    if (meta.status !== 200) return await showToast('获取数据失败')
    console.log(orders)
    
    this.setData({
      orderList: orders.map( v=> ({...v,create_time_cn: new Date(v.create_time*1000).toLocaleString()}))
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