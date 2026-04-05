const { getFlightPostById, saveFlightApply } = require('../../../utils/store');

function createDefaultForm() {
  return {
    requested_weight_kg: '',
    ecommerce_platform: '',
    product_desc: '',
    remark: '',
    requester_wechat_id: '',
    agreement: false,
  };
}

Page({
  data: {
    post: null,
    form: createDefaultForm(),
  },

  onLoad(options) {
    this.postId = options.id;
    this.setData({ post: getFlightPostById(options.id) });
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
    if (Number(form.requested_weight_kg) <= 0) {
      wx.showToast({ title: '申请重量必须大于 0', icon: 'none' });
      return;
    }
    if (!form.requester_wechat_id) {
      wx.showToast({ title: '请填写你的微信号', icon: 'none' });
      return;
    }
    if (!form.agreement) {
      wx.showToast({ title: '请先勾选规则确认', icon: 'none' });
      return;
    }

    saveFlightApply(this.postId, { ...form, requested_weight_kg: Number(form.requested_weight_kg) });
    wx.showToast({ title: '申请已提交', icon: 'success' });
    wx.showModal({
      title: '已模拟交换联系',
      content: '当前为 MVP 演示版本，系统已记录联系意向。双方后续可通过微信私下沟通。',
      showCancel: false,
    });
    this.setData({ form: createDefaultForm() });
  },
});
