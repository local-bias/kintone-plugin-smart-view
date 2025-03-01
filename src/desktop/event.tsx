import { listener } from '@/lib/listener';
import { restorePluginConfig } from '@/lib/plugin';
import { VIEW_ROOT_ID } from '@/lib/statics';
import { store } from '@/lib/store';
import { showNotification } from '@/lib/utilities';
import { css } from '@emotion/css';
import { Root, createRoot } from 'react-dom/client';
import App from './app';
import { initializeAppFormLayout } from './initialize-app-form-layout';
import { initializeAppProperties } from './initialize-app-properties';
import { initializeRecords } from './initialize-records';
import { paginationChunkAtom } from './states/pagination';
import { extractedSearchConditionsAtom, pluginConditionAtom, viewTypeAtom } from './states/plugin';

let cachedRoot: Root | null = null;

listener.add(['app.record.index.show'], async (event) => {
  const config = restorePluginConfig();
  const targetCondition = config.conditions.find(
    (condition) => Number(condition.viewId) === event.viewId
  );
  if (!targetCondition) {
    return event;
  }

  document.body.classList.add(css`
    .gaia-argoui-app-index-pager,
    .category-left-gaia {
      display: none !important;
    }
  `);

  const rootElement =
    document.querySelector(`#${VIEW_ROOT_ID}`) ||
    document.querySelector('.gaia-app-indexview-customview-html') ||
    document.querySelector('.gaia-mobile-app-customview') ||
    document.querySelector('.contents-gaia');

  if (!rootElement) {
    showNotification({
      title: 'プラグインでエラーが発生しました',
      body: 'プラグインの一覧を表示する領域が見つかりませんでした',
    });
    return event;
  }

  const extractedSearchCondition = targetCondition.extractedInputs.map((input) => ({
    ...input,
    value: '',
  }));

  const root = cachedRoot || createRoot(rootElement);
  if (!cachedRoot) {
    cachedRoot = root;
  }

  store.set(pluginConditionAtom, targetCondition);
  store.set(paginationChunkAtom, targetCondition.paginationChunk || 100);
  store.set(viewTypeAtom, targetCondition.viewType || 'table');
  extractedSearchCondition.forEach((con, index) => {
    store.set(extractedSearchConditionsAtom(index), con);
  });

  initializeRecords(targetCondition);
  initializeAppProperties();
  initializeAppFormLayout();

  root.render(<App />);

  return event;
});
