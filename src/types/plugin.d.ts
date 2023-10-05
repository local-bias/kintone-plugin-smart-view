declare namespace kintone {
  namespace plugin {
    type LatestStorage = StorageV1;
    type LatestCondition = ConditionV1;

    type Storage = StorageV1; // | StorageV2 | StorageV3 | ...
    type Condition = ConditionV1; // | ConditionV2 | ConditionV3 | ...

    type StorageV1 = {
      version: 1;
      conditions: ConditionV1[];
    };

    type ConditionV1 = {
      viewId: string;
      viewDisplayingFields: string[];
      enableCSVExport: boolean;
      editable: boolean;
      sortable: boolean;
      paginationChunk?: number;
      enablesPaginationChunkControl?: boolean;
      ignoresLetterCase?: boolean;
      ignoresKatakana?: boolean;
      ignoresZenkakuEisuji?: boolean;
      ignoresHankakuKatakana?: boolean;
      disableCursorAPI?: boolean;
      openDetailInNewTab?: boolean;
    };
  }
}
