import React from 'react';
import { restoreStorage } from '@common/plugin';
import { render } from 'react-dom';
import { css } from '@emotion/css';

import App from './app';

const events: launcher.EventTypes = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const found = config.conditions.find((condition) => Number(condition.viewId) === event.viewId);

  if (!found) {
    return event;
  }

  document.body.classList.add(css`
    .gaia-argoui-app-index-pager {
      display: none !important;
    }
  `);

  render(
    <App condition={found} />,
    document.querySelector('.gaia-app-indexview-customview-html') ||
      document.querySelector('.gaia-mobile-app-customview') ||
      document.querySelector('.contents-gaia')
  );

  return event;
};

export default { events, action };
