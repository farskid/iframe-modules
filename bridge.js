export const devPortalBridge = {
  log(...params) {
    console.log(...params);
  },
  pushUrl(url) {
    window.history.pushState(null, "", url);
  },
  popUrl(step = -1) {
    window.history.go(step);
  }
};
