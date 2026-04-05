const { saveDriverService } = require('../../../utils/store');

function createDefaultForm() {
  return {
    driver_name: '',
    car_model: '',
    seat_count: '',
    luggage_capacity_note: '',
    service_area: '',
    reference_price: '',
    language_supported: '',
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

  submit() {
    const { form } = this.data;
    if (!form.driver_name || !form.car_model || !form.service_area) {
      wx.showToast({ title: '请填写司机名、车型、服务区域', icon: 'none' });
      return;
    }
    if (!form.wechat_id && !form.whatsapp) {
      wx.showToast({ title: '微信号或 WhatsApp 至少填写一个', icon: 'none' });
      return;
    }
    saveDriverService({ ...form, seat_count: Number(form.seat_count || 0) });
    wx.showToast({ title: '司机服务已发布', icon: 'success' });
    this.setData({ form: createDefaultForm() });
  },
});
