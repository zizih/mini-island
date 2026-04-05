const { syncTabBar } = require('../../utils/tabbar');
const { getPickupDemands, getDriverServices, getFlightPosts } = require('../../utils/store');
const travelNotes = require('../../mock/travelNotes');

const QUICK_TAGS = ['接机', '司机', '目的地', '拼车', '行李互助'];

Page({
  data: {
    keyword: '',
    activeTag: '',
    quickTags: QUICK_TAGS,
    feedList: [],
    filteredFeedList: [],
  },

  onShow() {
    syncTabBar('/pages/home/index');
    this.buildFeed();
  },

  buildFeed() {
    const pickupFeed = getPickupDemands().map((item) => ({
      id: item.id,
      module: '龙目岛本地',
      category: '接机需求',
      title: `${item.airport} -> ${item.destination}`,
      line1: `${item.date} ${item.time} · ${item.passenger_count}人 · ${item.luggage_count}件行李`,
      line2: item.preferred_car_type || '车型未填写',
      remark: item.remark || '',
      contactLabel: item.wechat_id ? '微信' : 'WhatsApp',
      contactValue: item.wechat_id || item.whatsapp || '',
      tags: ['接机', item.share_ride_flag ? '拼车' : '独立', '目的地'],
    }));

    const driverFeed = getDriverServices().map((item) => ({
      id: item.id,
      module: '龙目岛本地',
      category: '司机服务',
      title: `${item.driver_name} / ${item.car_model}`,
      line1: `${item.service_area} · ${item.seat_count}座`,
      line2: item.language_supported || '语言未填写',
      remark: item.reference_price || item.remark || '',
      contactLabel: item.wechat_id ? '微信' : 'WhatsApp',
      contactValue: item.wechat_id || item.whatsapp || '',
      tags: ['司机', '本地出行'],
    }));

    const travelFeed = travelNotes.map((item) => ({
      id: item.id,
      module: '中印尼出行',
      category: '实用信息',
      title: item.title,
      line1: item.summary,
      line2: item.updatedAt,
      remark: '',
      contactLabel: item.channel,
      contactValue: item.contact,
      tags: ['目的地', '出行'],
    }));

    const baggageFeed = getFlightPosts().map((item) => ({
      id: item.id,
      module: '附加工具',
      category: '行李互助',
      title: `${item.departure_city} -> ${item.arrival_city}`,
      line1: `${item.departure_date} · 可用 ${item.available_weight_kg}kg`,
      line2: item.volume_note || '体积说明未填写',
      remark: '仅限正规电商商品',
      contactLabel: '微信',
      contactValue: item.wechat_id,
      tags: ['行李互助'],
    }));

    const feedList = [...pickupFeed, ...driverFeed, ...travelFeed, ...baggageFeed];
    this.setData({ feedList }, () => this.applyFilter());
  },

  onKeywordChange(e) {
    this.setData({ keyword: e.detail.value }, () => this.applyFilter());
  },

  toggleTag(e) {
    const { tag } = e.currentTarget.dataset;
    this.setData({ activeTag: this.data.activeTag === tag ? '' : tag }, () => this.applyFilter());
  },

  applyFilter() {
    const { keyword, activeTag, feedList } = this.data;
    const text = (keyword || '').trim().toLowerCase();

    const filteredFeedList = feedList.filter((item) => {
      const source = [item.module, item.category, item.title, item.line1, item.line2, item.remark, item.contactLabel, item.contactValue, ...(item.tags || [])].join(' ').toLowerCase();
      const keywordMatch = !text || source.includes(text);
      const tagMatch = !activeTag || (item.tags || []).includes(activeTag) || item.category.includes(activeTag) || item.title.includes(activeTag);
      return keywordMatch && tagMatch;
    });

    this.setData({ filteredFeedList });
  },

  copyContact(e) {
    const { value, label } = e.currentTarget.dataset;
    if (!value) {
      wx.showToast({ title: '暂无联系方式', icon: 'none' });
      return;
    }
    wx.setClipboardData({
      data: value,
      success: () => {
        wx.showToast({ title: `${label}已复制`, icon: 'none' });
      },
    });
  },
});
