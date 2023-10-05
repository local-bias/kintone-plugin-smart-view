import { restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from './global';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): kintone.plugin.LatestStorage => ({
  version: 1,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (storage: kintone.plugin.Storage): kintone.plugin.LatestStorage => {
  const { version } = storage;
  switch (version) {
    case undefined:
    case 1:
      return storage;
    default:
      return storage;
  }
};

export const restorePluginConfig = (): kintone.plugin.LatestStorage => {
  const config = restoreStorage<kintone.plugin.Storage>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getNewCondition = (): kintone.plugin.LatestCondition => ({
  viewId: '',
  viewDisplayingFields: [''],
  enableCSVExport: false,
  paginationChunk: 100,
  enablesPaginationChunkControl: false,
  editable: false,
  sortable: true,
  ignoresLetterCase: true,
  ignoresKatakana: true,
  ignoresZenkakuEisuji: true,
  ignoresHankakuKatakana: true,
  disableCursorAPI: false,
  openDetailInNewTab: false,
});
