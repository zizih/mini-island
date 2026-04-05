const STATUS_MAP = {
  OPEN: { text: '???', theme: 'success' },
  MATCHING: { text: '???', theme: 'warning' },
  CLOSED: { text: '???', theme: 'default' },
};

Component({
  properties: {
    status: String,
  },

  data: {
    tag: STATUS_MAP.OPEN,
  },

  observers: {
    status(value) {
      this.setData({
        tag: STATUS_MAP[value] || STATUS_MAP.OPEN,
      });
    },
  },
});
