import React from 'react';
import { restoreStorage } from '@common/plugin';
import { createRoot } from 'react-dom/client';
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

  const root =
    document.querySelector('.gaia-app-indexview-customview-html') ||
    document.querySelector('.gaia-mobile-app-customview') ||
    document.querySelector('.contents-gaia');

  if (!root) {
    const error = document.createElement('div');
    error.textContent = 'プラグインの一覧を表示する領域が見つかりませんでした';
    error.classList.add(css`
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      background-color: rgb(254 202 202);
      color: rgb(239 68 68);
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(239 68 68);
    `);
    document.body.append(error);
    return event;
  }
  createRoot(root).render(<App condition={found} />);

  return event;
};

export default { events, action };
