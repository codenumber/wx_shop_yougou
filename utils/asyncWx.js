export const  getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (result1) => {
        reject(result1)
      }
    })
  }) 
}


export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success: (result2) => {
        resolve(result2)
      }
    })
  })
}


export const chooseAddress = () => {
  return  new Promise((resolve,reject) => {
    wx.chooseAddress({
      success: (result3) => {
        resolve(result3)
      },
      fail: (result4) => {
        reject(result4)
      }
    })
  })
}