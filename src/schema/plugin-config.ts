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

/** セルの条件付き書式の設定情報 */
const CellFormatConditionSchema = z.object({
  fieldCode: z.string(),
  condition: z.array(
    z.object({
      type: z.enum([
        'always',
        'empty',
        'full',
        'greater',
        'less',
        'equal',
        'notEqual',
        'includes',
        'notIncludes',
      ]),
      valueType: z.enum(['value', 'field']),
      valueFieldCode: z.string().optional(),
      value: z.string().optional(),
      backgroundColor: z.string(),
      foregroundColor: z.string(),
    })
  ),
});

/**
 * バージョン11
 *
 * - viewFieldsにisMiniGraphEnabled, miniGraphType, miniGraphValueFieldCode, miniGraphLabelFieldCodeを追加
 *    - miniGraphTypeはbar, pieのいずれか
 *    - miniGraphValueFieldCodeはグラフの値として使用するフィールドコード
 *    - miniGraphLabelFieldCodeはグラフのラベルとして使用するフィールドコード
 *
 * - viewFieldsにisFormatConditionEnabled, formatConditionsを追加
 *    - isFormatConditionEnabledはセルの条件付き書式を有効にするかどうか
 *    - formatConditionsはセルの条件付き書式の設定情報
 */
const PluginConditionV11Schema = z.object({
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
      isMiniGraphEnabled: z.boolean().optional(),
      miniGraphType: z.enum(['bar', 'stackedBar', 'pie']).optional(),
      miniGraphValueFieldCode: z.string().optional(),
      miniGraphLabelFieldCode: z.string().optional(),
      isFormatConditionEnabled: z.boolean().optional(),
      formatConditions: z.array(CellFormatConditionSchema).optional(),
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
const PluginConfigV11Schema = z.object({
  version: z.literal(11),
  conditions: z.array(PluginConditionV11Schema),
});

export const AnyPluginConfigSchema = z.discriminatedUnion('version', [
  PluginConfigV1Schema,
  PluginConfigV2Schema,
  PluginConfigV3Schema,
  PluginConfigV4Schema,
  PluginConfigV5Schema,
  PluginConfigV6Schema,
  PluginConfigV7Schema,
  PluginConfigV8Schema,
  PluginConfigV9Schema,
  PluginConfigV10Schema,
  PluginConfigV11Schema,
]);

const LatestPluginConfigSchema = PluginConfigV11Schema;

export const LatestPluginConditionSchema = LatestPluginConfigSchema.shape.conditions.element;

/** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
export type AnyPluginConfig = z.infer<typeof AnyPluginConfigSchema>;

/** 🔌 プラグインがアプリ単位で保存する設定情報 */
export type PluginConfig = z.infer<typeof LatestPluginConfigSchema>;

/** 🔌 プラグインの詳細設定 */
export type PluginCondition = PluginConfig['conditions'][number];

/** 🔌 選択できる一覧の種類 */
export type PluginViewType = PluginCondition['viewType'];

/** 🔌 プラグインの一覧に表示するフィールド情報 */
export type PluginViewField = PluginCondition['viewFields'][number];

/** 🔌 他アプリとの結合設定 */
export type PluginJoinCondition = PluginCondition['joinConditions'][number];

/** 🔌 検索用に切り出すフィールド情報 */
export type PluginExtractedInput = PluginCondition['extractedInputs'][number];

/** 🔌 検索用に切り出すフィールドのタイプ */
export type PluginExtractedInputType = PluginExtractedInput['type'];

/** 🔌 検索用に切り出されたフィールドの検索値 */
export type PluginExtractedSearchCondition = PluginExtractedInput & { value: string };
