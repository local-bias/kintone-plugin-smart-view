declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV9;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 他アプリとの結合設定 */
  type JoinCondition = Condition['joinConditions'][number];

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
  type AnyConfig =
    | ConfigV1
    | ConfigV2
    | ConfigV3
    | ConfigV4
    | ConfigV5
    | ConfigV6
    | ConfigV7
    | ConfigV8
    | ConfigV9;

  type ConfigV9 = {
    version: 9;
    conditions: (Omit<ConfigV8['conditions'][number], 'viewFields'> & {
      /**
       * 他アプリとの結合設定
       */
      joinConditions: {
        /** 設定ID */
        id: string;
        /** プラグインを設定しているアプリのキーとなるフィールド */
        srcKeyFieldCode: string;
        /** 結合先アプリのアプリID */
        dstAppId: string;
        /** 結合先アプリのスペースID */
        dstSpaceId: string | null;
        /** 結合先アプリのゲストスペースかどうか */
        isDstAppGuestSpace: boolean;
        /** 結合先アプリのキーとなるフィールド */
        dstKeyFieldCode: string;
      }[];
      viewFields: (ConfigV8['conditions'][number]['viewFields'][number] & {
        joinConditionId: string | null;
      })[];
    })[];
  };

  type ConfigV8 = {
    version: 8;
    conditions: (Omit<ConfigV7['conditions'][number], 'viewFields'> & {
      id: string;
      viewFields: (ConfigV7['conditions'][number]['viewFields'][number] & { id: string })[];
    })[];
  };

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
      /**
       * - `true` - レコード一覧画面からレコードを削除する機能を有効にする
       * - `false` - 削除機能を無効にする
       */
      isDeletable: boolean;
      /**
       * - `true` - レコード一覧画面から各フィールド単位でソートできる
       * - `false` - ソートを無効にする
       */
      isSortable: boolean;
      /** レコード一覧に一度に表示するレコード数の上限 */
      paginationChunk: number;
      /**
       * - `true` - レコード一覧画面から表示するレコード数を変更できる
       * - `false` - 変更できない
       */
      isPaginationChunkControlShown: boolean;
      /**
       * - `true` - アルファベットの大文字と小文字を区別する
       * - `false` - 区別しない
       */
      isCaseSensitive: boolean;
      /**
       * - `true` - カタカナの全角と半角を区別する
       * - `false` - 区別しない
       */
      isKatakanaSensitive: boolean;
      /**
       * - `true` - 全角英数字と半角英数字を区別する
       * - `false` - 区別しない
       */
      isZenkakuEisujiSensitive: boolean;
      /**
       * - `true` - 半角カタカナの全角と半角を区別する
       * - `false` - 区別しない
       */
      isHankakuKatakanaSensitive: boolean;
      /**
       * - `true` - カーソルAPIを有効にする
       * - `false` - レコードの降順に取得する
       */
      isCursorAPIEnabled: boolean;
      /**
       * - `true` - 詳細画面を新しいタブで開く
       * - `false` - 詳細画面を同じタブで開く
       */
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
