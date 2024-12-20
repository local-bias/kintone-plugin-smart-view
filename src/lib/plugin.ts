import { restoreStorage } from '@konomi-app/kintone-utilities';
import { PLUGIN_ID } from './global';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const PluginConditionV1Schema = z.object({
  viewId: z.string(),
  viewDisplayingFields: z.array(z.string()),
  enableCSVExport: z.boolean(),
  editable: z.boolean(),
  deletable: z.boolean().optional(),
  sortable: z.boolean(),
  paginationChunk: z.number().optional(),
  enablesPaginationChunkControl: z.boolean().optional(),
  ignoresLetterCase: z.boolean().optional(),
  ignoresKatakana: z.boolean().optional(),
  ignoresZenkakuEisuji: z.boolean().optional(),
  ignoresHankakuKatakana: z.boolean().optional(),
  disableCursorAPI: z.boolean().optional(),
  openDetailInNewTab: z.boolean().optional(),
});
const PluginConfigV1Schema = z.object({
  version: z.literal(1),
  conditions: z.array(PluginConditionV1Schema),
});
type PluginConfigV1 = z.infer<typeof PluginConfigV1Schema>;

const PluginConditionV2Schema = z.object({
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      fieldCode: z.string(),
      width: z.number(),
    })
  ),
  isCsvDownloadButtonHidden: z.boolean(),
  isEditable: z.boolean(),
  isDeletable: z.boolean(),
  isSortable: z.boolean(),
  paginationChunk: z.number(),
  isPaginationChunkControlShown: z.boolean(),
  isCaseSensitive: z.boolean(),
  isKatakanaSensitive: z.boolean(),
  isZenkakuEisujiSensitive: z.boolean(),
  isHankakuKatakanaSensitive: z.boolean(),
  isCursorAPIEnabled: z.boolean(),
  isOpenInNewTab: z.boolean(),
});
const PluginConfigV2Schema = z.object({
  version: z.literal(2),
  conditions: z.array(PluginConditionV2Schema),
});
type PluginConfigV2 = z.infer<typeof PluginConfigV2Schema>;

const PluginConditionV3Schema = z.object({
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      fieldCode: z.string(),
      width: z.number(),
    })
  ),
  extractedInputs: z.array(
    z.object({
      type: z.union([
        z.literal('text'),
        z.literal('date'),
        z.literal('month'),
        z.literal('year'),
        z.literal('autocomplete'),
      ]),
      fieldCode: z.string(),
    })
  ),
  isCsvDownloadButtonHidden: z.boolean(),
  isEditable: z.boolean(),
  isDeletable: z.boolean(),
  isSortable: z.boolean(),
  paginationChunk: z.number(),
  isPaginationChunkControlShown: z.boolean(),
  isCaseSensitive: z.boolean(),
  isKatakanaSensitive: z.boolean(),
  isZenkakuEisujiSensitive: z.boolean(),
  isHankakuKatakanaSensitive: z.boolean(),
  isCursorAPIEnabled: z.boolean(),
  isOpenInNewTab: z.boolean(),
});
const PluginConfigV3Schema = z.object({
  version: z.literal(3),
  conditions: z.array(PluginConditionV3Schema),
});
type PluginConfigV3 = z.infer<typeof PluginConfigV3Schema>;

const PluginConditionV4Schema = PluginConditionV3Schema.merge(
  z.object({
    isEditorControlEnabled: z.boolean(),
    editors: z.array(
      z.object({
        type: z.union([z.literal('user'), z.literal('group'), z.literal('organization')]),
        code: z.string(),
      })
    ),
    isDeleterControlEnabled: z.boolean(),
    deleters: z.array(
      z.object({
        type: z.union([z.literal('user'), z.literal('group'), z.literal('organization')]),
        code: z.string(),
      })
    ),
  })
);
const PluginConfigV4Schema = z.object({
  version: z.literal(4),
  conditions: z.array(PluginConditionV4Schema),
});
type PluginConfigV4 = z.infer<typeof PluginConfigV4Schema>;

const PluginConditionV5Schema = PluginConditionV4Schema.omit({ viewFields: true }).merge(
  z.object({
    viewFields: z.array(
      z.object({
        fieldCode: z.string(),
        width: z.number(),
        isEditable: z.boolean(),
      })
    ),
  })
);
const PluginConfigV5Schema = z.object({
  version: z.literal(5),
  conditions: z.array(PluginConditionV5Schema),
});
type PluginConfigV5 = z.infer<typeof PluginConfigV5Schema>;

const PluginConditionV6Schema = PluginConditionV5Schema.merge(
  z.object({
    isViewSortConditionEnabled: z.boolean(),
  })
);
const PluginConfigV6Schema = z.object({
  version: z.literal(6),
  conditions: z.array(PluginConditionV6Schema),
});
type PluginConfigV6 = z.infer<typeof PluginConfigV6Schema>;

const PluginConditionV7Schema = PluginConditionV6Schema.merge(
  z.object({
    viewType: z.union([z.literal('table'), z.literal('card')]),
    isViewTypeControlEnabled: z.boolean(),
  })
);
const PluginConfigV7Schema = z.object({
  version: z.literal(7),
  conditions: z.array(PluginConditionV7Schema),
});
type PluginConfigV7 = z.infer<typeof PluginConfigV7Schema>;

const PluginConditionV8Schema = PluginConditionV7Schema.omit({ viewFields: true }).merge(
  z.object({
    id: z.string(),
    viewFields: z.array(
      z.object({
        id: z.string(),
        fieldCode: z.string(),
        width: z.number(),
        isEditable: z.boolean(),
      })
    ),
  })
);
const PluginConfigV8Schema = z.object({
  version: z.literal(8),
  conditions: z.array(PluginConditionV8Schema),
});
type PluginConfigV8 = z.infer<typeof PluginConfigV8Schema>;

const PluginConditionV9Schema = PluginConditionV8Schema.omit({ viewFields: true }).merge(
  z.object({
    viewFields: z.array(
      z.object({
        id: z.string(),
        fieldCode: z.string(),
        width: z.number(),
        isEditable: z.boolean(),
        joinConditionId: z.string().nullable(),
      })
    ),
    /** 他アプリとの結合設定 */
    joinConditions: z.array(
      z.object({
        /** 設定ID */
        id: z.string(),
        /** プラグインを設定しているアプリのキーとなるフィールド */
        srcKeyFieldCode: z.string(),
        /** 結合先アプリのアプリID */
        dstAppId: z.string(),
        /** 結合先アプリのスペースID */
        dstSpaceId: z.string().nullable(),
        /** 結合先アプリのゲストスペースかどうか */
        isDstAppGuestSpace: z.boolean(),
        /** 結合先アプリのキーとなるフィールド */
        dstKeyFieldCode: z.string(),
      })
    ),
  })
);
const PluginConfigV9Schema = z.object({
  version: z.literal(9),
  conditions: z.array(PluginConditionV9Schema),
});
type PluginConfigV9 = z.infer<typeof PluginConfigV9Schema>;

const PluginConditionV10Schema = PluginConditionV9Schema.omit({ viewFields: true }).merge(
  z.object({
    viewFields: z.array(
      z.object({
        id: z.string(),
        fieldCode: z.string(),
        width: z.number(),
        isEditable: z.boolean(),
        joinConditionId: z.string().nullable(),
        displayName: z.string().nullable(),
        nowrap: z.boolean(),
      })
    ),
  })
);
const PluginConfigV10Schema = z.object({
  version: z.literal(10),
  conditions: z.array(PluginConditionV10Schema),
});
type PluginConfigV10 = z.infer<typeof PluginConfigV10Schema>;

/** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
type AnyPluginConfig =
  | PluginConfigV1
  | PluginConfigV2
  | PluginConfigV3
  | PluginConfigV4
  | PluginConfigV5
  | PluginConfigV6
  | PluginConfigV7
  | PluginConfigV8
  | PluginConfigV9
  | PluginConfigV10;

export type PluginConfig = PluginConfigV10;

export type PluginCondition = PluginConfig['conditions'][number];

export const validatePluginCondition = (condition: unknown): boolean => {
  try {
    const result = PluginConditionV10Schema.parse(condition);
    return result !== undefined;
  } catch {
    return false;
  }
};

/**
 * プラグインの設定情報のひな形を返却します
 */
export const createConfig = (): PluginConfig => ({
  version: 10,
  conditions: [getNewCondition()],
});

/**
 * 古いバージョンの設定情報を新しいバージョンに変換します
 * @param storage 保存されている設定情報
 * @returns 新しいバージョンの設定情報
 */
export const migrateConfig = (config: AnyPluginConfig): PluginConfig => {
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
    default:
      return config;
  }
};

export const restorePluginConfig = (): PluginConfig => {
  const config = restoreStorage<AnyPluginConfig>(PLUGIN_ID) ?? createConfig();
  return migrateConfig(config);
};

export const getNewJoinCondition = (): Plugin.JoinCondition => ({
  id: nanoid(),
  srcKeyFieldCode: '',
  dstAppId: '',
  dstSpaceId: null,
  isDstAppGuestSpace: false,
  dstKeyFieldCode: '',
});

export const getNewViewField = (): Plugin.ViewField => ({
  id: nanoid(),
  fieldCode: '',
  width: 0,
  isEditable: true,
  joinConditionId: null,
  displayName: null,
  nowrap: false,
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
});
