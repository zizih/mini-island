const { savePickupDemand } = require('../../../utils/store');

function createDefaultForm() {
  return {
    date: '',
    time: '',
    airport: '',
    destination: '',
    passenger_count: '',
    luggage_count: '',
    preferred_car_type: '',
    share_ride_flag: false,
    remark: '',
    wechat_id: '',
    whatsapp: '',
  };
}

Page({
  data: {
    form: createDefaultForm(),
  },

  onFieldChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onShareRideChange(e) {
    this.setData({ 'form.share_ride_flag': (e.detail.value || []).includes('share') });
  },

  submit() {
    const { form } = this.data;
    if (!form.date || !form.airport || !form.destination) {
      wx.showToast({ title: '请先填写日期、机场和目的地', icon: 'none' });
      return;
    }
    if (!form.wechat_id && !form.whatsapp) {
      wx.showToast({ title: '微信号或 WhatsApp 至少填写一个', icon: 'none' });
      return;
    }
    savePickupDemand({
      ...form,
      passenger_count: Number(form.passenger_count || 0),
      luggage_count: Number(form.luggage_count || 0),
    });
    wx.showToast({ title: '需求已发布', icon: 'success' });
    this.setData({ form: createDefaultForm() });
  },
});
