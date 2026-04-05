const { getFlightPostById } = require('../../../utils/store');

Page({
  data: {
    post: null,
  },

  onLoad(options) {
    this.setData({ post: getFlightPostById(options.id) });
  },

  goApply() {
    const { post } = this.data;
    if (!post) return;
    wx.navigateTo({ url: `/pages/flight/apply/index?id=${post.id}` });
  },

  goBack() {
    wx.navigateBack();
  },
});
