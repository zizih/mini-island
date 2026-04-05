const { initMockStorage, getCurrentUser } = require('./utils/store');

App({
  globalData: {
    currentUser: null,
  },

  onLaunch() {
    initMockStorage();
    this.globalData.currentUser = getCurrentUser();
  },
});
