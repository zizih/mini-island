const { saveFlightPost } = require('../../../utils/store');

function createDefaultForm() {
  return {
    direction: 'CN_TO_ID',
    departure_date: '',
    departure_city: '',
    departure_airport: '',
    arrival_city: '',
    arrival_airport: '',
    available_weight_kg: '',
    volume_note: '',
    reference_price: '',
    remark: '',
    wechat_id: '',
    agreement: false,
  };
}

Page({
  data: {
    form: createDefaultForm(),
    directionOptions: [
      { value: 'CN_TO_ID', label: '中国 -> 印尼' },
      { value: 'ID_TO_CN', label: '印尼 -> 中国' },
    ],
  },

  setDirection(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({ 'form.direction': value });
  },

  onFieldChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({ [`form.${field}`]: e.detail.value });
  },

  onAgreementChange(e) {
    this.setData({ 'form.agreement': (e.detail.value || []).includes('agree') });
  },

  submit() {
    const { form } = this.data;
    const requiredFields = ['departure_date', 'departure_city', 'departure_airport', 'arrival_city', 'arrival_airport', 'available_weight_kg', 'wechat_id'];
    const missingField = requiredFields.find((key) => !form[key]);

    if (missingField) {
      wx.showToast({ title: '请填写完整必填项', icon: 'none' });
      return;
    }
    if (Number(form.available_weight_kg) <= 0) {
      wx.showToast({ title: '可用重量必须大于 0', icon: 'none' });
      return;
    }
    if (!form.agreement) {
      wx.showToast({ title: '请先勾选规则确认', icon: 'none' });
      return;
    }

    saveFlightPost({
      ...form,
      available_weight_kg: Number(form.available_weight_kg),
      agreement: undefined,
    });

    wx.showToast({ title: '发布成功（Mock）', icon: 'success' });
    this.setData({ form: createDefaultForm() });
  },
});
