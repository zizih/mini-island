const { getPickupDemands, saveServiceContact } = require('../../../utils/store');

Page({
  data: {
    list: [],
  },

  onShow() {
    this.setData({ list: getPickupDemands() });
  },

  contact(e) {
    const item = e.detail;
    const contact = item.wechat_id || item.whatsapp;
    const contactType = item.wechat_id ? '微信' : 'WhatsApp';

    saveServiceContact({
      moduleType: '接机需求',
      postTitle: `${item.airport} -> ${item.destination}`,
      summary: `已联系 ${item.date} ${item.time} 的出行需求`,
      contact,
      contactType,
    });

    wx.showModal({
      title: '联系信息',
      content: `${contactType}：${contact}\n你们可以离开平台后自行沟通接机细节。`,
      showCancel: false,
    });
  },
});
