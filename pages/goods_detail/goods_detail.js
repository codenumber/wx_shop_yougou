// pages/goods_detail/goods_detail.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {}
  },
  goods_id: 0,
  //本地商品
  goodsObj: {},
  /**
   * 生命周期函数--监听页面加载
   */
  async getGoodsInfo() {
    const res = await request({url:'/goods/detail',data: {goods_id: this.goods_id}})
    console.log(res)
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
    console.log(e)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //添加在本地购物车数据
  addCart() {
    const cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex(v => v.goods_id === parseInt(this.goods_id))
    console.log(index,this.goods_id)
    if (index !== -1) {
      cart[index].num ++
    } else {
      this.goodsObj.num = 1
      cart.push(this.goodsObj)
    }
    wx.setStorageSync('cart',cart)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })
    注意
  },
  onLoad: function (options) {
    this.goods_id = options.goods_id
    this.getGoodsInfo()
    
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