const { syncTabBar } = require('../../utils/tabbar');

Page({
  onShow() {
    syncTabBar('/pages/home/index');
  },

  goFlightList() {
    wx.navigateTo({ url: '/pages/flight/list/index' });
  },

  goLombokHome() {
    wx.navigateTo({ url: '/pages/lombok/home/index' });
  },

  goPublish() {
    wx.switchTab({ url: '/pages/publish/index' });
  },
});
