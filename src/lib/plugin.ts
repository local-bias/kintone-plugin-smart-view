import {
  AnyPluginConfig,
  LatestPluginConditionSchema,
  PluginCondition,
  PluginConfig,
  PluginJoinCondition,
  PluginViewField,
} from '@/schema/plugin-config';
import { restorePluginConfig as primitiveRestore } from '@konomi-app/kintone-utilities';
import { nanoid } from 'nanoid';
import { PLUGIN_ID } from './global';

export const validatePluginCondition = (condition: unknown): boolean => {
  try {
    const result = LatestPluginConditionSchema.parse(condition);
    return result !== undefined;
  } catch {
    return false;
  }
};

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): PluginConfig => ({
  version: 12,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 * @throws {Error} マイグレーション処理に失敗した場合
 */
export const migrateConfig = (config: AnyPluginConfig): PluginConfig => {
  try {
    const { version } = config;
    switch (version) {
      case undefined:
      case 1: {
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
      }
      case 2: {
        return migrateConfig({
          version: 3,
          conditions: config.conditions.map((condition) => ({
            extractedInputs: [{ type: 'text', fieldCode: '' }],
            ...condition,
          })),
        });
      }
      case 3: {
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
      }
      case 4: {
        return migrateConfig({
          version: 5,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            viewFields: condition.viewFields.map((field) => ({ ...field, isEditable: true })),
          })),
        });
      }
      case 5: {
        return migrateConfig({
          version: 6,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            isViewSortConditionEnabled: true,
          })),
        });
      }
      case 6: {
        return migrateConfig({
          version: 7,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            viewType: 'table',
            isViewTypeControlEnabled: false,
          })),
        });
      }
      case 7: {
        return migrateConfig({
          version: 8,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            id: nanoid(),
            viewFields: condition.viewFields.map((field) => ({ ...field, id: nanoid() })),
          })),
        });
      }
      case 8: {
        return migrateConfig({
          version: 9,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            viewFields: condition.viewFields.map((field) => ({ ...field, joinConditionId: null })),
            joinConditions: [getNewJoinCondition()],
          })),
        });
      }
      case 9: {
        return migrateConfig({
          version: 10,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            viewFields: condition.viewFields.map((field) => ({
              ...field,
              displayName: null,
              nowrap: false,
            })),
          })),
        });
      }
      case 10:
        return migrateConfig({ ...config, version: 11 });
      case 11: {
        return migrateConfig({
          version: 12,
          conditions: config.conditions.map((condition) => ({
            ...condition,
            isViewFieldsControlEnabled: false,
            isAllFieldsSearchEnabled: false,
            viewFields: condition.viewFields.map((field) => ({
              ...field,
              maxHeight: null,
            })),
          })),
        });
      }
      case 12:
      default:
        return config;
    }
  } catch (error) {
    console.error('❌ マイグレーション処理中にエラーが発生しました', error);
    throw new Error(
      `プラグイン設定のマイグレーションに失敗しました: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

/**
 * プラグイン設定を復元します
 * エラーが発生した場合は、エラー情報と共にデフォルト設定を返却します
 * @returns {config: PluginConfig, error?: Error} プラグイン設定とエラー情報
 */
export const restorePluginConfig = (): { config: PluginConfig; error?: Error } => {
  try {
    const savedConfig = primitiveRestore<AnyPluginConfig>(PLUGIN_ID);

    if (!savedConfig) {
      console.warn('⚠️ 保存された設定が見つかりません。デフォルト設定を使用します。');
      return { config: createConfig() };
    }

    const migratedConfig = migrateConfig(savedConfig);
    return { config: migratedConfig };
  } catch (error) {
    console.error('❌ プラグイン設定の復元中にエラーが発生しました', error);
    const configError =
      error instanceof Error
        ? error
        : new Error(`プラグイン設定の復元に失敗しました: ${String(error)}`);

    // エラーが発生してもデフォルト設定を返すことでアプリケーションは起動する
    return {
      config: createConfig(),
      error: configError,
    };
  }
};

export const getNewJoinCondition = (): PluginJoinCondition => ({
  id: nanoid(),
  srcKeyFieldCode: '',
  dstAppId: '',
  dstSpaceId: null,
  isDstAppGuestSpace: false,
  dstKeyFieldCode: '',
});

export const getNewViewField = (): PluginViewField => ({
  id: nanoid(),
  fieldCode: '',
  width: 0,
  isEditable: true,
  joinConditionId: null,
  displayName: null,
  nowrap: false,
  maxHeight: null,
});

export const getNewCondition = (): PluginCondition => ({
  id: nanoid(),
  viewId: '',
  viewFields: [getNewViewField()],
  extractedInputs: [{ type: 'text', fieldCode: '' }],
  joinConditions: [getNewJoinCondition()],
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
  isAllFieldsSearchEnabled: false,
  isViewFieldsControlEnabled: false,
});
