const { syncTabBar } = require('../../utils/tabbar');
const { getContacts } = require('../../utils/store');

Page({
  data: {
    contacted: [],
    contactedMe: [],
  },

  onShow() {
    syncTabBar('/pages/contacts/index');
    const contacts = getContacts();
    this.setData({
      contacted: contacts.contacted,
      contactedMe: contacts.contactedMe,
    });
  },
});
