Component({
  data: {
    selected: '/pages/home/index',
    tabs: [
      { value: '/pages/home/index', text: '首页', icon: 'home' },
      { value: '/pages/publish/index', text: '发布', icon: 'add-circle' },
      { value: '/pages/contacts/index', text: '联系', icon: 'chat' },
      { value: '/pages/my/index', text: '我的', icon: 'user' }
    ],
  },

  methods: {
    onTabTap(e) {
      const { path } = e.currentTarget.dataset;
      if (!path || path === this.data.selected) return;
      this.setData({ selected: path });
      wx.switchTab({ url: path });
    },
  },
});
