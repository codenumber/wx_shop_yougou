let ajaxTimes = 0
export  const request = (params) => {
  const base_Url = "https://api-hmugo-web.itheima.net/api/public/v1"
  ajaxTimes ++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: base_Url + params.url ,
      success: (result) => {
        resolve(result)
      },
      fail: (result) => {
        reject(result)
      },
      complete: () => {
        ajaxTimes --
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
        
      }
    })
  })
}
