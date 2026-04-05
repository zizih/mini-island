Component({
  options: {
    multipleSlots: true,
  },

  properties: {
    title: String,
    subtitle: String,
    primaryText: String,
    secondaryText: String,
    item: {
      type: Object,
      value: {},
    },
  },

  methods: {
    handleTap() {
      this.triggerEvent('cardtap', this.properties.item);
    },
    handlePrimaryTap() {
      this.triggerEvent('primarytap', this.properties.item);
    },
    handleSecondaryTap() {
      this.triggerEvent('secondarytap', this.properties.item);
    },
  },
});
