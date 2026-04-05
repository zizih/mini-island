const { syncTabBar } = require('../../utils/tabbar');
const { getCurrentUser } = require('../../utils/store');

Page({
  data: {
    user: {},
  },

  onShow() {
    syncTabBar('/pages/my/index');
    this.setData({
      user: getCurrentUser(),
    });
  },

  goMyPosts() {
    wx.navigateTo({ url: '/pages/my-posts/index' });
  },

  goContacts() {
    wx.switchTab({ url: '/pages/contacts/index' });
  },

  goRules() {
    wx.navigateTo({ url: '/pages/rules/index' });
  },
});
