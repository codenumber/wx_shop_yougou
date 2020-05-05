import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async getSwiperList() {
    const res = await request( {url:'/home/swiperdata'})
    if (res.data.meta.status !== 200) return 
    this.setData({
      swiperList: res.data.message
    })
  },
  async getCateList() {
    const res = await request({url: '/home/catitems'})
    if (res.data.meta.status !== 200) return 
    this.setData({
      cateList: res.data.message
    })
  },
  async getGoodsList() {
    const res = request({url: '/home/floordata'})
    if (res.data.meta.status !== 200) return 
    this.setData({
      floorList: res.data.message
    })
  },
  onLoad: function (options) {
   this.getSwiperList()
   this.getCateList()
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