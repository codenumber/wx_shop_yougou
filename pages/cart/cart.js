// pages/cart/cart.js
import {getSetting, openSetting, chooseAddress, showModal, showToast} from '../../utils/asyncWx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    total: 0
  },
  async handleAdress() {
    try {
      const res = await getSetting()
      const scopeAdress = res.authSetting["scope.address"]
      if (scopeAdress === false ) {
        await openSetting()
      }
        let address = await chooseAddress()
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
        wx.setStorageSync('address',address)
    } catch (error) {
        console.log(error)
    }
  
  },
  changeGoodsCheckedStatus(e) {
    const {id} = e.currentTarget.dataset
    const index = this.data.cart.findIndex(v => v.goods_id === id )
    this.data.cart[index].checked = !this.data.cart[index].checked
    const cart = this.data.cart
    wx.setStorageSync('cart',this.data.cart)
    this.setDataValue(cart)
  },
  changeAllCheckedStatus() {
    this.data.allChecked = !this.data.allChecked
    this.data.cart.forEach(v => {
      v.checked = this.data.allChecked
    })
    const cart = this.data.cart
    //保存商品是否被选中状态
    wx.setStorageSync('cart', cart)
    this.setDataValue(cart)
  },
  setDataValue(cart) {
    const allChecked = this.data.cart.length ? this.data.cart.every(v => v.checked) : false
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
      allChecked,
      totalPrice,
      totalNum
    })
  },
  async changeGoodsNum(e) {
    let {operation,id} = e.currentTarget.dataset
    const {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if (cart[index].num === 1 && parseInt(operation) === -1) {
      const res = await showModal("是否删除该商品")
      if (res.confirm) {
        cart.splice(index,1)
        this.setDataValue(cart)
        wx.setStorageSync('cart',cart)
        return
      }
    }
    cart[index].num += parseInt(operation)
    this.setDataValue(cart)
  },
  toPay() {
    if (!this.data.address.userName) {
      showToast("请先调价收货地址")
      return
    }
    if (this.data.cart.length === 0) {
      showToast("请先为购物车添加商品")
      return
    }
    if (this.data.totalNum === 0) {
      showToast("请选择购买的商品")
      return
    }
    wx.navigateTo({
      url: '../pay/pay',
    })
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
    const cart = wx.getStorageSync('cart') || []
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