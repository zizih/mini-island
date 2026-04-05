function syncTabBar(selected) {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];

  if (!currentPage || typeof currentPage.getTabBar !== 'function') {
    return;
  }

  const tabBar = currentPage.getTabBar();
  if (tabBar && typeof tabBar.setData === 'function') {
    tabBar.setData({ selected });
  }
}

module.exports = {
  syncTabBar,
};
