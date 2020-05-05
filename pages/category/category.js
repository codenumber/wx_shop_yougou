import { request } from "../../request/index.js"

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateMenu: [],
    rightContent: [],
    activeIndex: 0,
    scrollTop: 0
  },
  cates: [],
  async getCateMenu() {
    const res = await request({url: '/categories'})
    if (res.data.meta.status !== 200) return
    this.cates = res.data.message
    const cateMenu = this.cates.map(item => item.cat_name)
    const rightContent = this.cates[0].children
    wx.setStorageSync('cates',{time: Date.now,data: this.cates})
    this.setData({
       cateMenu,
       rightContent
    })
    
  },
  handleChangeIndex(e) {
    const {index} = e.currentTarget.dataset
    const rightContent = this.cates[index].children
    this.setData({
      rightContent,
      activeIndex: index,
      scrollTop: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates')
    if (!cates){
      this.getCateMenu()
    } else {
      const time = cates.time
      if (Date.now() - time > 10*1000) {
       this.getCateMenu()
      } else {
        const cateMenu = cates.data.map(item => item.cat_name)
        const rightContent = cates.data[0].children
        this.cates = cates.data
        this.setData({
          cateMenu,
          rightContent
        })
      }
    }
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