/* eslint-disable camelcase */
// import React from 'react';
import ReactDOM from 'react-dom/client';

import ru_RU from 'antd/locale/ru_RU';
import { ConfigProvider } from 'antd';

import App from './components/App';
import './assets/scss/global.scss';
import customTheme from './assets/theme/customTheme';
import WSConnection from './components/modules/WSConnection.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <WSConnection>

    <ConfigProvider
      locale={ru_RU}
      theme={{
        components: customTheme,
      }}
    >
      <App />
    </ConfigProvider>
    ,
  </WSConnection>,
);
