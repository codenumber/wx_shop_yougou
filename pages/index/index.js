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
    let {data:{meta},data:{message}} = await request( {url:'/home/swiperdata'})
    if (meta.status !== 200) return 
    //处理轮播图的跳转地址
    message.forEach(v => {
      v.navigator_url = v.navigator_url.replace(/main/,"goods_detail")
    })
    this.setData({
      swiperList: message
    })
  },
  async getCateList() {
    const {data:{meta},data:{message}} = await request({url: '/home/catitems'})
    if (meta.status !== 200) return
    message.forEach(v => {
      if (v.navigator_url) {
        v.navigator_url = v.navigator_url.replace(/main/,"category")
      }
    }) 
    this.setData({
      cateList: message
    })
  },
  async getGoodsList() {
    const {data:{meta},data:{message}} = await request({url: '/home/floordata'})
    if (meta.status !== 200) return 
    message.forEach(v => {
      v.product_list.forEach(v1 => {
        v1.navigator_url = v1.navigator_url.replace(/goods_list/,'goods_list/goods_list')
      })
    })
    this.setData({
      floorList: message
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