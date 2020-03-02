const base_url = 'http://47.105.137.19/api'

export function request(options){
    //Python:request.request(method,url,params,data,json)
    //options:{url,method,data}
    // 解构对象
  const { path, data, method,} = options

    //返回异步处理的Promise
    //ES6(ECMScript 6) fetch{{}}.then().catch()
    return new Promise((resolve,reject)=>{
        //小程序的网络请求
        wx.showLoading({
          title: '正在加载',
          mask:true
        })
        wx.request({
          url: base_url + path,
          method:method || 'GET',
          data: data||'',
          success: (res)=>{
            resolve(res)
          },
          fail:(e)=>{
            reject(e)
            wx.showToast({
              title: '加载数据失败',
              icon:'none',
              duration:1000,
              mask:true
            })
          },
          complete:()=>{
            wx.hideLoading()
            wx.hideToast()
          }
        })
    })
}