// pages/cart/cart.js
import {getSetting, openSetting, chooseAddress, showModal,getLogin,showToast} from '../../utils/asyncWx.js'
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    total: 0,
    token: ''
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
  async handleUserInfo(e) {
    console.log(e)
    try {
      const {encryptedData, rawData, iv, signature,userInfo} = e.detail
      const {code} = await getLogin()
      const data = {encryptedData, rawData, iv, signature,code}
      const res = await request({url:'/users/wxlogin',method: "POST",data})
      //页面的请求是无效的，因为这个需要企业级id与接口开放，借用一个提供的token
      if (userInfo) {
        wx.setStorageSync('userInfo',userInfo)
        wx.setStorageSync('token',"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
      }
    //促使页面重新显示，不然页面判断依旧
      this.onShow()
  } catch(err) {
      console.log(err)
    }
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
    console.log('22')
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    const token = wx.getStorageSync('token') || ''
    this.setData({address,token})
    this.setDataValue(cart)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('heih')
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