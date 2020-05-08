// pages/search/search.js
import {request} from '../../request/index.js'
import { showToast } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searGoodsList: [1],
    btnShow: false,
    queryGoodsList: [],
    inputValue: ""
  },
  timeId: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e) {
    console.log(e)
    clearTimeout(this.timeId)
    let {value} = e.detail
    console.log(value)
    if (!value.trim()) {
      clearInterval(this.timeId)
      this.clearData()
      return
    }
    setTimeout(()=> {
      this.timeId = this.queryGoods(value)
    },1000)
      
    
  },
  async queryGoods(value) {
    const {data: {message},data: {meta}} =  await request({url:'/goods/qsearch?query=' + value})
    if (meta.status !== 200) return 
    console.log(message)
    this.setData({
      queryGoodsList: message,
      btnShow: true
    })
  },
  clearData(e) {
    
    clearTimeout(this.timeId)
    
    this.setData({
      queryGoodsList: [],
      btnShow: false,
      inputValue: ""
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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