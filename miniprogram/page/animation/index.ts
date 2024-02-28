Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})

    if (wx.canIUse('getExptInfoSync')) {
      console.log('getExptInfoSync expt_args_1', wx.getExptInfoSync(['expt_args_1']))
      console.log('getExptInfoSync expt_args_2', wx.getExptInfoSync(['expt_args_2']))
      console.log('getExptInfoSync expt_args_3', wx.getExptInfoSync(['expt_args_3']))
    }
    if (wx.canIUse('reportEvent')) {
      wx.reportEvent('expt_event_1', { expt_data: 1 })
      wx.reportEvent('expt_event_2', { expt_data: 5 })
      wx.reportEvent('expt_event_3', { expt_data: 9 })
      wx.reportEvent('expt_event_4', { expt_data: 200 })

      wx.reportEvent('weexpt_event_key_1', { option_1: 1, option_2: 10, option_str_1: 'abc' })
      wx.reportEvent('weexpt_event_key_1', { option_1: 'abc', option_2: '1000', option_str_1: '1' })
    }
  },
  onShareAppMessage() {
    return {
      title: 'AR魔方',
      path: 'page/animation/index'
    }
  },
  onShareTimeline() {
    'AR魔方'
  },

  data: {
    list: [
      {
        id: 'XRFrame',
        name: 'XRFrame 高性能XR解决方案',
        open: false,
        pages: [
          { url: 'pages/index/index', name: '总览' }
        ]
      }
    ],
    theme: 'light'
  },

  onUnload() {
    if (wx.offThemeChange) {
      wx.offThemeChange()
    }
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme })
      })
    }
  },

  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  },

  navToDoc(e) {
    wx.navigateTo({
      url: '/packageComponent/pages/doc-web-view/doc-web-view',
    })
  },
  // 打开自定义路由页面
  goToCustomRoute: function goToCustomRoute(evt) {
    const { url } = evt.currentTarget.dataset
    wx.navigateTo({
      routeType: 'ScaleTransition',
      url: `${url}`
    });
  },
})
