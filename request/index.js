export  const request = (params) => {
  const base_Url = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: base_Url + params.url ,
      success: (result) => {
        resolve(result)
      },
      fail: (result) => {
        reject(result)
      }
    })
  })
}
