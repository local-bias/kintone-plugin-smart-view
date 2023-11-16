declare namespace Plugin {
  /** 🔌 プラグインがアプリ単位で保存する設定情報 */
  type Config = ConfigV2;

  /** 🔌 プラグインの詳細設定 */
  type Condition = Config['conditions'][number];

  /** 🔌 過去全てのバージョンを含むプラグインの設定情報 */
  type AnyConfig = ConfigV1 | ConfigV2;

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
