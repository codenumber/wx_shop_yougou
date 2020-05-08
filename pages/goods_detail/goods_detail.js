// pages/goods_detail/goods_detail.js
import {request} from '../../request/index.js'
import {showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    isCollect: false
  },
  goods_id: 0,
  //本地商品
  goodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  async getGoodsInfo() {
    const res = await request({url:'/goods/detail',data: {goods_id: this.goods_id}})
    if (res.data.meta.status !== 200) return 
    this.goodsObj = res.data.message
    this.setData({
      goodsInfo: {
        goods_id: res.data.message.goods_id,
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        goods_introduce: res.data.message.goods_introduce.replace(/.webp/g,'.jpg'),
        pics: res.data.message.pics
      }
    })
  },
  handlePreview(e) {
    const urls = this.data.goodsInfo.pics.map(v => v.pics_mid_url)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //添加在本地购物车数据
  addCart() {
    const cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex(v => v.goods_id === parseInt(this.goods_id))
    
    if (index !== -1) {
      cart[index].num ++
    } else {
      this.goodsObj.num = 1
      this.goodsObj.checked = false
      cart.push(this.goodsObj)
    }
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })
  },
  async changeCollectStatus() {
    const collect = wx.getStorageSync('collect') || []
    console.log(this.goods_id)
    console.log(collect)
    console.log(index)
    const index = collect.findIndex(v => v.goods_id === parseInt(this.goods_id))
    let titleStatus = ""
    if (index === -1) {
      this.data.isCollect = true
      collect.push(this.goodsObj)
      titleStatus = "收藏"
    } else {
      this.data.isCollect = false
      collect.splice(index,1)
      titleStatus = "取消收藏"
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect: this.data.isCollect
    })
    await showToast(titleStatus + "成功")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const pages = getCurrentPages()
    const {options} = pages[pages.length - 1]
    this.goods_id = options.goods_id
    this.getGoodsInfo()
    let collect = wx.getStorageSync('collect') || []
    let isCollect = collect.some(v => v.goods_id === parseInt(this.goods_id))
    this.setData({
      isCollect
    })
  },
  onLoad(options) {
    console.log()
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