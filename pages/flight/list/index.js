const { getFlightPosts } = require('../../../utils/store');

Page({
  data: {
    posts: [],
    filteredPosts: [],
    filters: {
      direction: '',
      departure_city: '',
      arrival_city: '',
      departure_date: '',
    },
    directionOptions: [
      { value: '', label: '全部方向' },
      { value: 'CN_TO_ID', label: '中国 -> 印尼' },
      { value: 'ID_TO_CN', label: '印尼 -> 中国' },
    ],
  },

  onShow() {
    const posts = getFlightPosts();
    this.setData({ posts }, () => this.applyFilters());
  },

  setDirection(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'filters.direction': value }, () => this.applyFilters());
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`filters.${field}`]: e.detail.value }, () => this.applyFilters());
  },

  applyFilters() {
    const { posts, filters } = this.data;
    const filteredPosts = posts.filter((item) => {
      const directionMatch = !filters.direction || item.direction === filters.direction;
      const departureMatch = !filters.departure_city || item.departure_city.includes(filters.departure_city);
      const arrivalMatch = !filters.arrival_city || item.arrival_city.includes(filters.arrival_city);
      const dateMatch = !filters.departure_date || item.departure_date.includes(filters.departure_date);
      return directionMatch && departureMatch && arrivalMatch && dateMatch;
    });
    this.setData({ filteredPosts });
  },

  goDetail(e) {
    const { id } = e.detail;
    wx.navigateTo({ url: `/pages/flight/detail/index?id=${id}` });
  },
});
