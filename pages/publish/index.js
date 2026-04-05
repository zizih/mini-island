const { syncTabBar } = require('../../utils/tabbar');

Page({
  onShow() {
    syncTabBar('/pages/publish/index');
  },

  goFlightPublish() {
    wx.navigateTo({ url: '/pages/flight/publish/index' });
  },

  goPickupPublish() {
    wx.navigateTo({ url: '/pages/lombok/pickup-publish/index' });
  },

  goDriverPublish() {
    wx.navigateTo({ url: '/pages/lombok/driver-publish/index' });
  },
});
