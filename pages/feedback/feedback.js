// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: '1',
        value: '体验问题',
        isActive: true
      },
      {
        id: '2',
        value: '商品、商家投诉',
        isActive: false
      },
      
    ],
    srcList: [],
    inputValue: ''
  },
  successImgList: [],
  changItemIndex(e) {
    const {index} = e.detail
    this.data.tabs.forEach((v,i) => i === index ? v.isActive = true:v.isActive = false)
    this.setData({
      tabs: this.data.tabs
    })
  },
  getUpImgList() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          srcList: [...this.data.srcList,...tempFilePaths]
        })
      }
    })
  },
  changUpImgList(e) {
    //图片上传组件
    const index = e.detail
    this.data.srcList.splice(index,1)
    this.setData({
      srcList: this.data.srcList
    })
  },
  getInputValue(e) {
    const {value} = e.detail
    this.setData({
      inputValue: value.trim()
    })
  },
  upLoadInfo() {
    wx.showLoading({
      title: '数据上传中',
    })
    console.log(this.data.srcList)
    if (this.data.srcList.length) {
      this.data.srcList.forEach((v,i) => {
        wx.uploadFile({
          filePath: v,
          name: 'image',
          url: 'https://img.coolcr.cn/api/upload',
          success: (res) => {
            const { data: {url}} = JSON.parse(res.data)
            console.log(url)
            // if (code !== 200) return 
            this.successImgList.push(url)
            if (i === this.data.srcList.length - 1) {
              //上传文字这一类的信息，没接口
              wx.hideLoading({
                complete: (res) => {
                  wx.showToast({
                    title: '上传成功',
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                },
              })
            }
          },
          fail:(err) => {
            console.log(err)
          }
        })
      })
    } else {
      //如果没有上传相片，执行上传文字信息后隐藏加载框
      wx.hideLoading({
        complete: (res) => {
          wx.showToast({
            title: '上传成功',
          })
          wx.navigateBack({
            delta: 1
          })
        },
      })
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