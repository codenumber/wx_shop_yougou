// pages/goods_detail/goods_detail.js
import {request} from '../../request/index.js'
import {showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsInfo: {},
    isCollect: false,
    animationData: {},
    num: 1,
    address: {},
    showCart: false
  },
  goods_id: 0,
  //本地商品
  goodsObj: {},
  showShopping: false,
  nav: false,
  /**
   * 生命周期函数--监听页面加载
   */
  async getGoodsInfo() {
    const res = await request({url:'/goods/detail',data: {goods_id: this.goods_id}})
    if (res.data.meta.status !== 200) return 
    this.goodsObj = res.data.message
    console.log(this.goodsObj)
    console.log(res.data.message.goods_big_logo)
    this.setData({
      goodsInfo: {
        goods_id: res.data.message.goods_id,
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        goods_introduce: res.data.message.goods_introduce.replace(/.webp/g,'.jpg'),
        pics: res.data.message.pics,
        goods_big_logo: res.data.message.goods_big_logo,
        attrs: res.data.message.attrs
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
      cart[index].num += this.data.num
    } else {
      this.goodsObj.num = this.data.num
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
    const address = wx.getStorageSync('address') || {}
    let isCollect = collect.some(v => v.goods_id === parseInt(this.goods_id))
    this.setData({
      isCollect,
      address
    })
  },
  showShoppingDialog(e) {
    //如果打开过这个选项。再次点击点击购买时直接去订单页面
    if (!e.currentTarget.dataset.nav) {
      if (this.nav) {//如果nav是ture就说明点击过商品属性选择模块。此时直接去付款
        return this.toPay()
      }
    }
      if(e.currentTarget.dataset.nav) {
        this.setData({
          showCart: true
        })
      }
    this.nav = e.currentTarget.dataset.nav ?  e.currentTarget.dataset.nav : false
    console.log(this.nav)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(600).step()

    this.setData({
      animationData:animation.export(),
      showShopping: true
    })
    setTimeout(() => {
      animation.translateY(20).step()
      this.setData({
        animationData: animation.export(),
      })
    },100)
  },
  stopTouch() {},
  closeShoppingDialog() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.translateY(600).step()

    this.setData({
      animationData:animation.export()
    })
    setTimeout(() => {
      animation.translateY(20).step()
      this.setData({
        animationData: animation.export(),
        showShopping: false
      })
    },100)
    
  },
  changNum(e) {
    const {operation} = e.currentTarget.dataset
    if (this.data.num == 1 && parseInt(operation) === -1) {
      return showToast("商品数量为1")
    }
    this.data.num += parseInt(operation)
    this.setData({
      num: this.data.num
    })
  },
  toPay() {
    this.goodsObj.num = this.data.num
    wx.setStorageSync('goods',this.goodsObj)
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  
  onLoad(options) {
    wx.login({
      success: (res) => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      num: 1
    })
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