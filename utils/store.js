const defaultFlightPosts = require('../mock/flightPosts');
const defaultPickupDemands = require('../mock/pickupDemands');
const defaultDriverServices = require('../mock/driverServices');
const defaultContacts = require('../mock/contacts');
const currentUser = require('../mock/user');

const STORAGE_KEYS = {
  flightPosts: 'mini_island_flight_posts',
  pickupDemands: 'mini_island_pickup_demands',
  driverServices: 'mini_island_driver_services',
  contacts: 'mini_island_contacts',
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function ensureStorage(key, defaults) {
  const value = wx.getStorageSync(key);
  if (!value || (Array.isArray(defaults) && !value.length) || (!Array.isArray(defaults) && !Object.keys(value || {}).length)) {
    wx.setStorageSync(key, clone(defaults));
  }
}

function initMockStorage() {
  ensureStorage(STORAGE_KEYS.flightPosts, defaultFlightPosts);
  ensureStorage(STORAGE_KEYS.pickupDemands, defaultPickupDemands);
  ensureStorage(STORAGE_KEYS.driverServices, defaultDriverServices);
  ensureStorage(STORAGE_KEYS.contacts, defaultContacts);
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function getDateTimeText() {
  const date = new Date();
  const pad = (value) => `${value}`.padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function getFlightPosts() {
  return clone(wx.getStorageSync(STORAGE_KEYS.flightPosts) || []);
}

function getPickupDemands() {
  return clone(wx.getStorageSync(STORAGE_KEYS.pickupDemands) || []);
}

function getDriverServices() {
  return clone(wx.getStorageSync(STORAGE_KEYS.driverServices) || []);
}

function getContacts() {
  return clone(wx.getStorageSync(STORAGE_KEYS.contacts) || defaultContacts);
}

function saveFlightPost(formData) {
  const list = getFlightPosts();
  list.unshift({ id: createId('flight'), status: 'OPEN', ...formData });
  wx.setStorageSync(STORAGE_KEYS.flightPosts, list);
  return list[0];
}

function savePickupDemand(formData) {
  const list = getPickupDemands();
  list.unshift({ id: createId('pickup'), status: 'OPEN', ...formData });
  wx.setStorageSync(STORAGE_KEYS.pickupDemands, list);
  return list[0];
}

function saveDriverService(formData) {
  const list = getDriverServices();
  list.unshift({ id: createId('driver'), status: 'OPEN', ...formData });
  wx.setStorageSync(STORAGE_KEYS.driverServices, list);
  return list[0];
}

function getFlightPostById(id) {
  return getFlightPosts().find((item) => item.id === id);
}

function addContactRecord({ bucket, moduleType, postTitle, summary, contact, contactType }) {
  const contacts = getContacts();
  contacts[bucket].unshift({
    id: createId('contact'),
    moduleType,
    postTitle,
    summary,
    contact,
    contactType,
    date: getDateTimeText(),
  });
  wx.setStorageSync(STORAGE_KEYS.contacts, contacts);
}

function saveFlightApply(postId, formData) {
  const post = getFlightPostById(postId);
  if (!post) return;

  addContactRecord({
    bucket: 'contacted',
    moduleType: '????',
    postTitle: `${post.departure_city} -> ${post.arrival_city} ${post.departure_date}`,
    summary: `???? ${formData.requested_weight_kg}kg,??:${formData.product_desc}`,
    contact: post.wechat_id,
    contactType: '??',
  });

  addContactRecord({
    bucket: 'contactedMe',
    moduleType: '????',
    postTitle: `${post.departure_city} -> ${post.arrival_city} ${post.departure_date}`,
    summary: `????? ${formData.requested_weight_kg}kg ??`,
    contact: formData.requester_wechat_id,
    contactType: '??',
  });
}

function saveServiceContact(payload) {
  addContactRecord({ bucket: 'contacted', ...payload });
}

function toggleStatus(listKey, id) {
  const key = STORAGE_KEYS[listKey];
  const list = clone(wx.getStorageSync(key) || []);
  const nextList = list.map((item) => {
    if (item.id !== id) return item;
    return { ...item, status: item.status === 'CLOSED' ? 'OPEN' : 'CLOSED' };
  });
  wx.setStorageSync(key, nextList);
  return nextList;
}

function getCurrentUser() {
  return clone(currentUser);
}

module.exports = {
  initMockStorage,
  getCurrentUser,
  getFlightPosts,
  getPickupDemands,
  getDriverServices,
  getContacts,
  getFlightPostById,
  saveFlightPost,
  savePickupDemand,
  saveDriverService,
  saveFlightApply,
  saveServiceContact,
  toggleStatus,
};
