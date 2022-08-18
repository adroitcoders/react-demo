let BrowserHistory;
if (typeof document !== 'undefined') {
  const { createBrowserHistory } = require('history');

  BrowserHistory = createBrowserHistory({ basename: '/'});
}

export const customHistory = BrowserHistory;
