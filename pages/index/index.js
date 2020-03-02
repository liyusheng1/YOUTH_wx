//index.js
import {request} from "../../utils/network_.js"

//获取应用实例
const app = getApp() // app.js创建的App对象

Page({
  data: {
      items:[],
      page:0  //当前页码
  },

  onLoad: function () {
    console.info(app.globalData.welcome)
    console.info('---index load---')
  },
  onUnload: function () {
    console.info('---index unload---')
  },
  // 显示和隐藏会被多次调用---页面切换时
  onShow: function () {
    console.info('---index show---')
  },
  onHide: function () {
    console.info('---index hide---')
  },
  onReady: function () {
    // 页面渲染完成后
    console.info('--index onReady---')
    //请求所有文章的数据
    request({
      path: '/home_source',
      method: 'GET',
      data: {
        pageCode: 0,
        limitNum: 20
      }
    }).then(res => {
      console.info(res)
      this.setData({
        items: [...res.data.data]
      })
    }).catch(e => {
      console.error(e)
    })
  },
  onPullDownRefresh: function () {
    console.info('--下拉刷新---')
    request({
      path: '/home_source',
      data: {
        pageCode: 0,
        limitNum: 2
      }
    }).then(res => {
      console.info(res)
      this.setData({
        items: [...res.data.data],
        page: 0
      })

      wx.stopPullDownRefresh() // 停止下拉刷新

    }).catch(e => {
      console.error(e)
    })
  },
  onReachBottom: function () {
    console.info('--上拉加载更多---')
    const currentPage = this.data.page
    const currentData = this.data.items
    
    request({
      path: '/home_source',
      data: {
        pageCode: currentPage+1,
        limitNum: 2
      }
    }).then(res => {
      console.info(res)
      const{code,message,data} = res.data
      if(code=='10000'){
        wx.showToast({
          title:message
        })
      }else{
        this.setData({
          items: [...currentData, ...res.data.data],  //累加数据
          page: currentPage + 1
        })
      }
    }).catch(e => {
      console.error(e)
    }) 
  }
})
