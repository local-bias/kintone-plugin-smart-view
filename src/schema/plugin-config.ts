import { z } from 'zod';

/*
 * プラグインの設定情報
 *
 * z.mergeを使ってバージョン間の差分を表現することもできるが、型推論が複雑になるため、重複して許容して定義する
 */

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

/**
 * バージョン4
 *
 * 編集、削除権限の設定を追加
 */
const PluginConditionV4Schema = z.object({
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
});
const PluginConfigV4Schema = z.object({
  version: z.literal(4),
  conditions: z.array(PluginConditionV4Schema),
});
type PluginConfigV4 = z.infer<typeof PluginConfigV4Schema>;

/**
 * バージョン5
 *
 * - ビューのフィールド設定に編集可否を制御するフラグを追加
 */
const PluginConditionV5Schema = z.object({
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      fieldCode: z.string(),
      width: z.number(),
      isEditable: z.boolean(),
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
});
const PluginConfigV5Schema = z.object({
  version: z.literal(5),
  conditions: z.array(PluginConditionV5Schema),
});
type PluginConfigV5 = z.infer<typeof PluginConfigV5Schema>;

/**
 * バージョン6
 *
 * - 一覧のソート条件を反映するかどうかのフラグを追加
 */
const PluginConditionV6Schema = z.object({
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      fieldCode: z.string(),
      width: z.number(),
      isEditable: z.boolean(),
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
  isViewSortConditionEnabled: z.boolean(),
});
const PluginConfigV6Schema = z.object({
  version: z.literal(6),
  conditions: z.array(PluginConditionV6Schema),
});
type PluginConfigV6 = z.infer<typeof PluginConfigV6Schema>;

/**
 * バージョン7
 *
 * - ビュータイプの設定を追加
 * - ビュータイプのコントロールの表示非表示を追加
 */
const PluginConditionV7Schema = z.object({
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      fieldCode: z.string(),
      width: z.number(),
      isEditable: z.boolean(),
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
  isViewSortConditionEnabled: z.boolean(),
  viewType: z.union([z.literal('table'), z.literal('card')]),
  isViewTypeControlEnabled: z.boolean(),
});
const PluginConfigV7Schema = z.object({
  version: z.literal(7),
  conditions: z.array(PluginConditionV7Schema),
});
type PluginConfigV7 = z.infer<typeof PluginConfigV7Schema>;

/**
 * バージョン8
 *
 * - IDを追加
 * - viewFieldsにIDを追加
 */
const PluginConditionV8Schema = z.object({
  id: z.string(),
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      id: z.string(),
      fieldCode: z.string(),
      width: z.number(),
      isEditable: z.boolean(),
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
  isViewSortConditionEnabled: z.boolean(),
  viewType: z.union([z.literal('table'), z.literal('card')]),
  isViewTypeControlEnabled: z.boolean(),
});
const PluginConfigV8Schema = z.object({
  version: z.literal(8),
  conditions: z.array(PluginConditionV8Schema),
});
type PluginConfigV8 = z.infer<typeof PluginConfigV8Schema>;

/**
 * バージョン9
 *
 * - joinConditionsを追加
 * - viewFieldsにjoinConditionIdを追加
 */
const PluginConditionV9Schema = z.object({
  id: z.string(),
  viewId: z.string(),
  viewFields: z.array(
    z.object({
      id: z.string(),
      fieldCode: z.string(),
      width: z.number(),
      isEditable: z.boolean(),
      joinConditionId: z.string().nullable(),
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
  isViewSortConditionEnabled: z.boolean(),
  viewType: z.union([z.literal('table'), z.literal('card')]),
  isViewTypeControlEnabled: z.boolean(),
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
});
const PluginConfigV9Schema = z.object({
  version: z.literal(9),
  conditions: z.array(PluginConditionV9Schema),
});
type PluginConfigV9 = z.infer<typeof PluginConfigV9Schema>;

/**
 * バージョン10
 *
 * - viewFieldsにdisplayNameとnowrapを追加
 */
const PluginConditionV10Schema = z.object({
  id: z.string(),
  viewId: z.string(),
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
  isViewSortConditionEnabled: z.boolean(),
  viewType: z.union([z.literal('table'), z.literal('card')]),
  isViewTypeControlEnabled: z.boolean(),
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
});
const PluginConfigV10Schema = z.object({
  version: z.literal(10),
  conditions: z.array(PluginConditionV10Schema),
});
type PluginConfigV10 = z.infer<typeof PluginConfigV10Schema>;

export const LatestPluginConditionSchema = PluginConditionV10Schema;

/** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
export type AnyPluginConfig =
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
