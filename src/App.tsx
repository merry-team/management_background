import React from 'react';
import { Provider } from 'mobx-react';
import * as allStores from './stores';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './App.scss';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, allStores.routingStore);

const App: React.FC = () => {
  return (
    <Provider {...allStores}>
      <LocaleProvider locale={zh_CN}>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            {/* 内容渲染 */}
            <Route component={Home} />
          </Switch>
        </Router>
      </LocaleProvider>
    </Provider>
  );
}

export default App;
