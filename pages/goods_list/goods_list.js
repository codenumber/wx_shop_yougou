// pages/goods_list/goods_list.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: '1',
        value: '综合',
        isActive: true
      },
      {
        id: '2',
        value: '销量',
        isActive: false
      },
      {
        id: '3',
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  queryInfo: {
    query: '',
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  cid: 0,
  query: '',
  total: 0,
  changItemIndex(e) {
    const {index} = e.detail
    this.data.tabs.forEach((v,i) => i === index ? v.isActive = true:v.isActive = false)
    this.setData({
      tabs: this.data.tabs
    })
  },
  async getGoodsList() {
    this.queryInfo.cid = this.cid
    this.queryInfo.query = this.query
    const {data:{meta},data:{message}} = await request({url:'/goods/search',data: this.queryInfo})
    if (meta.status !== 200) return
    this.total = message.total
    this.setData({
      goodsList: message.goods
    })
    wx.stopPullDownRefresh()
  },
  // 获取新数据
  async  getNewGoodsList() {
    this.queryInfo.pagenum ++
    if (this.queryInfo.pagenum <= Math.ceil(this.total/this.queryInfo.pagesize)) {
      const {data:{meta},data:{message}} = await request({url:'/goods/search',data: this.queryInfo})
      if (meta.status !== 200) return
      const newGoodsList = message.goods
      const goodsList = [...newGoodsList,...this.data.goodsList]
       this.setData({
         goodsList: goodsList
       })
    } else {
      wx.showToast({
        title: '没有商品了哦'
      })
    }
   
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    this.cid = options.cid || ''
    this.query = options.query || ''
    this.getGoodsList()
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
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getNewGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})