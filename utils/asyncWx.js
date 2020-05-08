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

export const showModal = (content) => {
  return  new Promise((resolve,reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result)
      },
      fail: (result1) => {
        reject(result1)
      }
    })
  })
}
export const showToast = (title) => {
  return  new Promise((resolve,reject) => {
    wx.showToast({
      title:  title,
      icon: 'success',
      success: (result) => {
        resolve(result)
      },
      fail: (result1) => {
        reject(result1)
      }
    })
  })
}
export const getLogin = () => {
  return  new Promise((resolve,reject) => {
    wx.login({
      fail: (err) => {
        reject(err)
      },
      success: (result) => {
        resolve(result)
      },
    })
  })
}
export const requestPayment = (pay) => {
  return  new Promise((resolve,reject) => {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}




