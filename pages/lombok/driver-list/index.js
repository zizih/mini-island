const { getDriverServices, saveServiceContact } = require('../../../utils/store');

Page({
  data: {
    list: [],
  },

  onShow() {
    this.setData({ list: getDriverServices() });
  },

  contact(e) {
    const item = e.detail;
    const contact = item.wechat_id || item.whatsapp;
    const contactType = item.wechat_id ? '微信' : 'WhatsApp';

    saveServiceContact({
      moduleType: '司机服务',
      postTitle: `${item.driver_name} / ${item.car_model}`,
      summary: `已联系司机，服务范围：${item.service_area}`,
      contact,
      contactType,
    });

    wx.showModal({
      title: '联系信息',
      content: `${contactType}：${contact}\n平台不收款，双方后续自行沟通价格与时间。`,
      showCancel: false,
    });
  },
});
