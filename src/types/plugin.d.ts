declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV7;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 検索用に切り出すフィールド情報 */
  type ExtractedInput = Condition['extractedInputs'][number];
  /** 🔌 検索用に切り出すフィールドのタイプ */
  type ExtractedInputType = ExtractedInput['type'];
  /** 🔌 検索用に切り出されたフィールドの検索値 */
  type ExtractedSearchCondition = ExtractedInput & { value: string };
  /** 🔌 選択できる一覧の種類 */
  type ViewType = Condition['viewType'];

  type ViewField = Condition['viewFields'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2 | ConfigV3 | ConfigV4 | ConfigV5 | ConfigV6 | ConfigV7;

  type ConfigV7 = {
    version: 7;
    conditions: (ConfigV6['conditions'][number] & {
      viewType: 'table' | 'card';
      isViewTypeControlEnabled: boolean;
    })[];
  };

  type ConfigV6 = {
    version: 6;
    conditions: (ConfigV5['conditions'][number] & {
      isViewSortConditionEnabled: boolean;
    })[];
  };

  type ConfigV5 = {
    version: 5;
    conditions: (Omit<ConfigV4['conditions'][number], 'viewFields'> & {
      viewFields: {
        fieldCode: string;
        width: number;
        isEditable: boolean;
      }[];
    })[];
  };

  type ConfigV4 = {
    version: 4;
    conditions: (ConfigV3['conditions'][number] & {
      isEditorControlEnabled: boolean;
      editors: {
        type: 'user' | 'group' | 'organization';
        code: string;
      }[];
      isDeleterControlEnabled: boolean;
      deleters: {
        type: 'user' | 'group' | 'organization';
        code: string;
      }[];
    })[];
  };

  type ConfigV3 = {
    version: 3;
    conditions: {
      viewId: string;
      viewFields: {
        fieldCode: string;
        width: number;
      }[];
      extractedInputs: {
        type: 'text' | 'date' | 'month' | 'year' | 'autocomplete';
        fieldCode: string;
      }[];
      isCsvDownloadButtonHidden: boolean;
      isEditable: boolean;
      isDeletable: boolean;
      isSortable: boolean;
      paginationChunk: number;
      isPaginationChunkControlShown: boolean;
      isCaseSensitive: boolean;
      isKatakanaSensitive: boolean;
      isZenkakuEisujiSensitive: boolean;
      isHankakuKatakanaSensitive: boolean;
      isCursorAPIEnabled: boolean;
      isOpenInNewTab: boolean;
    }[];
  };

  type ConfigV2 = {
    version: 2;
    conditions: {
      viewId: string;
      viewFields: {
        fieldCode: string;
        width: number;
      }[];
      isCsvDownloadButtonHidden: boolean;
      isEditable: boolean;
      isDeletable: boolean;
      isSortable: boolean;
      paginationChunk: number;
      isPaginationChunkControlShown: boolean;
      isCaseSensitive: boolean;
      isKatakanaSensitive: boolean;
      isZenkakuEisujiSensitive: boolean;
      isHankakuKatakanaSensitive: boolean;
      isCursorAPIEnabled: boolean;
      isOpenInNewTab: boolean;
    }[];
  };

  type ConfigV1 = {
    version: 1;
    conditions: {
      viewId: string;
      viewDisplayingFields: string[];
      enableCSVExport: boolean;
      editable: boolean;
      deletable?: boolean;
      sortable: boolean;
      paginationChunk?: number;
      enablesPaginationChunkControl?: boolean;
      ignoresLetterCase?: boolean;
      ignoresKatakana?: boolean;
      ignoresZenkakuEisuji?: boolean;
      ignoresHankakuKatakana?: boolean;
      disableCursorAPI?: boolean;
      openDetailInNewTab?: boolean;
    }[];
  };
}
