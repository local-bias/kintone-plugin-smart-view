import React from 'react';
import { restoreStorage } from '@/common/plugin';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';

import App from './app';
import { VIEW_ROOT_ID } from '@/common/statics';
import { showNotification } from '@/common/utilities';

const events: launcher.EventTypes = ['app.record.index.show'];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  const found = config.conditions.find((condition) => Number(condition.viewId) === event.viewId);

  if (!found) {
    return event;
  }

  document.body.classList.add(css`
    .gaia-argoui-app-index-pager,
    .category-left-gaia {
      display: none !important;
    }
  `);

  const root =
    document.querySelector(`#${VIEW_ROOT_ID}`) ||
    document.querySelector('.gaia-app-indexview-customview-html') ||
    document.querySelector('.gaia-mobile-app-customview') ||
    document.querySelector('.contents-gaia');

  if (!root) {
    showNotification({
      title: 'プラグインでエラーが発生しました',
      body: 'プラグインの一覧を表示する領域が見つかりませんでした',
    });
    return event;
  }
  createRoot(root).render(<App condition={found} />);

  return event;
};

export default { events, action };
