import React from 'react';
import { restoreStorage } from '@/lib/plugin';
import { createRoot } from 'react-dom/client';
import { css } from '@emotion/css';
import App from './app';
import { VIEW_ROOT_ID } from '@/lib/statics';
import { showNotification } from '@/lib/utilities';
import { PLUGIN_ID } from '@/lib/global';
import { listener } from '@/lib/listener';

listener.add(['app.record.index.show'], async (event) => {
  const config = restoreStorage(PLUGIN_ID);

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
});
