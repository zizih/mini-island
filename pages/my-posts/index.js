const { getFlightPosts, getPickupDemands, getDriverServices, toggleStatus } = require('../../utils/store');

Page({
  data: {
    flightPosts: [],
    pickupDemands: [],
    driverServices: [],
  },

  onShow() {
    this.refreshData();
  },

  refreshData() {
    this.setData({
      flightPosts: getFlightPosts(),
      pickupDemands: getPickupDemands(),
      driverServices: getDriverServices(),
    });
  },

  editTip() {
    wx.showToast({ title: 'MVP 先保留入口，下一步可接编辑回填', icon: 'none' });
  },

  toggleFlightStatus(e) {
    toggleStatus('flightPosts', e.currentTarget.dataset.id);
    this.refreshData();
  },

  togglePickupStatus(e) {
    toggleStatus('pickupDemands', e.currentTarget.dataset.id);
    this.refreshData();
  },

  toggleDriverStatus(e) {
    toggleStatus('driverServices', e.currentTarget.dataset.id);
    this.refreshData();
  },
});
