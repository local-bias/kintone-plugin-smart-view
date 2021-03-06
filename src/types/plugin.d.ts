declare namespace kintone {
  namespace plugin {
    /**
     * プラグインがアプリ単位で保存する設定情報
     */
    type Storage = {
      conditions: Condition[];
    };

    type Condition = {
      viewId: string;
      viewDisplayingFields: string[];
      enableCSVExport: boolean;
      editable: boolean;
      sortable: boolean;
      ignoresLetterCase?: boolean;
      ignoresKatakana?: boolean;
    };
  }
}
