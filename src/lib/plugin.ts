import { restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from './global';
import { nanoid } from 'nanoid';

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): Plugin.Config => ({
  version: 8,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (config: Plugin.AnyConfig): Plugin.Config => {
  const { version } = config;
  switch (version) {
    case undefined:
    case 1:
      return migrateConfig({
        version: 3,
        conditions: config.conditions.map((condition) => ({
          viewId: condition.viewId,
          viewFields: condition.viewDisplayingFields.map((fieldCode) => ({
            fieldCode,
            width: 0,
          })),
          extractedInputs: [{ type: 'text', fieldCode: '' }],
          isCsvDownloadButtonHidden: !condition.enableCSVExport,
          isEditable: condition.editable ?? true,
          isDeletable: condition.deletable ?? true,
          isSortable: condition.sortable ?? true,
          paginationChunk: condition.paginationChunk ?? 100,
          isPaginationChunkControlShown: condition.enablesPaginationChunkControl ?? false,
          isCaseSensitive: !(condition.ignoresLetterCase ?? true),
          isKatakanaSensitive: !(condition.ignoresKatakana ?? true),
          isZenkakuEisujiSensitive: !(condition.ignoresZenkakuEisuji ?? true),
          isHankakuKatakanaSensitive: !(condition.ignoresHankakuKatakana ?? true),
          isCursorAPIEnabled: !(condition.disableCursorAPI ?? false),
          isOpenInNewTab: condition.openDetailInNewTab ?? false,
        })),
      });
    case 2:
      return migrateConfig({
        version: 3,
        conditions: config.conditions.map((condition) => ({
          extractedInputs: [{ type: 'text', fieldCode: '' }],
          ...condition,
        })),
      });
    case 3:
      return migrateConfig({
        version: 4,
        conditions: config.conditions.map((condition) => ({
          ...condition,
          isEditorControlEnabled: false,
          editors: [{ type: 'user', code: '' }],
          isDeleterControlEnabled: false,
          deleters: [{ type: 'user', code: '' }],
        })),
      });
    case 4:
      return migrateConfig({
        version: 5,
        conditions: config.conditions.map((condition) => ({
          ...condition,
          viewFields: condition.viewFields.map((field) => ({ ...field, isEditable: true })),
        })),
      });
    case 5:
      return migrateConfig({
        version: 6,
        conditions: config.conditions.map((condition) => ({
          ...condition,
          isViewSortConditionEnabled: true,
        })),
      });
    case 6:
      return migrateConfig({
        version: 7,
        conditions: config.conditions.map((condition) => ({
          ...condition,
          viewType: 'table',
          isViewTypeControlEnabled: false,
        })),
      });
    case 7:
      return migrateConfig({
        version: 8,
        conditions: config.conditions.map((condition) => ({
          ...condition,
          id: nanoid(),
          viewFields: condition.viewFields.map((field) => ({ ...field, id: nanoid() })),
        })),
      });
    default:
      return config;
  }
};

export const restorePluginConfig = (): Plugin.Config => {
  const config = restoreStorage<Plugin.AnyConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getNewCondition = (): Plugin.Condition => ({
  id: nanoid(),
  viewId: '',
  viewFields: [{ id: nanoid(), fieldCode: '', width: 0, isEditable: true }],
  extractedInputs: [{ type: 'text', fieldCode: '' }],
  isCsvDownloadButtonHidden: false,
  isEditable: true,
  isEditorControlEnabled: false,
  editors: [{ type: 'user', code: '' }],
  isDeletable: true,
  isDeleterControlEnabled: false,
  deleters: [{ type: 'user', code: '' }],
  isViewSortConditionEnabled: true,
  isSortable: true,
  paginationChunk: 100,
  isPaginationChunkControlShown: false,
  isCaseSensitive: false,
  isKatakanaSensitive: false,
  isZenkakuEisujiSensitive: false,
  isHankakuKatakanaSensitive: false,
  isCursorAPIEnabled: true,
  isOpenInNewTab: false,
  viewType: 'table',
  isViewTypeControlEnabled: false,
});
