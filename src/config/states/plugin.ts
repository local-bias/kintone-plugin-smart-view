import { restorePluginConfig } from '@/lib/plugin';
import { produce } from 'immer';
import { atom, selector } from 'recoil';

const PREFIX = 'plugin';

const updated = <T extends keyof kintone.plugin.LatestCondition>(
  storage: kintone.plugin.LatestStorage,
  props: {
    conditionIndex: number;
    key: T;
    value: kintone.plugin.LatestCondition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

const getConditionField = <T extends keyof kintone.plugin.LatestCondition>(
  storage: kintone.plugin.LatestStorage,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<kintone.plugin.LatestCondition[T]>;
  }
): NonNullable<kintone.plugin.LatestCondition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};

export const storageState = atom<kintone.plugin.LatestStorage>({
  key: `${PREFIX}storageState`,
  default: restorePluginConfig(),
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const conditionsState = selector<kintone.plugin.LatestCondition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});

export const conditionState = selector<kintone.plugin.LatestCondition | null>({
  key: `${PREFIX}conditionState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    const storage = get(storageState);
    return storage.conditions[conditionIndex] ?? null;
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      produce(current, (draft) => {
        draft.conditions[conditionIndex] = newValue as kintone.plugin.LatestCondition;
      })
    );
  },
});

export const viewIdState = selector<string>({
  key: `${PREFIX}viewIdState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'viewId',
      defaultValue: '',
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'viewId',
        value: newValue as string,
      })
    );
  },
});

export const viewDisplayingFieldsState = selector<string[]>({
  key: `${PREFIX}viewDisplayingFieldsState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'viewDisplayingFields',
      defaultValue: [''],
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'viewDisplayingFields',
        value: newValue as string[],
      })
    );
  },
});

export const paginationChunkState = selector<number>({
  key: `${PREFIX}paginationChunkState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'paginationChunk',
      defaultValue: 100,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'paginationChunk',
        value: newValue as number,
      })
    );
  },
});

export const enablesPaginationChunkControlState = selector<boolean>({
  key: `${PREFIX}enablesPaginationChunkControlState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'enablesPaginationChunkControl',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'enablesPaginationChunkControl',
        value: newValue as boolean,
      })
    );
  },
});

export const enableCSVExportState = selector<boolean>({
  key: `${PREFIX}enableCSVExportState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'enableCSVExport',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'enableCSVExport',
        value: newValue as boolean,
      })
    );
  },
});

export const editableState = selector<boolean>({
  key: `${PREFIX}editableState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'editable',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'editable',
        value: newValue as boolean,
      })
    );
  },
});

export const sortableState = selector<boolean>({
  key: `${PREFIX}sortableState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'sortable',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'sortable',
        value: newValue as boolean,
      })
    );
  },
});

export const ignoresLetterCaseState = selector<boolean>({
  key: `${PREFIX}ignoresLetterCaseState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'ignoresLetterCase',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'ignoresLetterCase',
        value: newValue as boolean,
      })
    );
  },
});

export const ignoresKatakanaState = selector<boolean>({
  key: `${PREFIX}ignoresKatakanaState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'ignoresKatakana',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'ignoresKatakana',
        value: newValue as boolean,
      })
    );
  },
});

export const ignoresZenkakuEisujiState = selector<boolean>({
  key: `${PREFIX}ignoresZenkakuEisujiState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'ignoresZenkakuEisuji',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'ignoresZenkakuEisuji',
        value: newValue as boolean,
      })
    );
  },
});

export const ignoresHankakuKatakanaState = selector<boolean>({
  key: `${PREFIX}ignoresHankakuKatakanaState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'ignoresHankakuKatakana',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'ignoresHankakuKatakana',
        value: newValue as boolean,
      })
    );
  },
});

export const disableCursorAPIState = selector<boolean>({
  key: `${PREFIX}disableCursorAPIState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'disableCursorAPI',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'disableCursorAPI',
        value: newValue as boolean,
      })
    );
  },
});

export const openDetailInNewTabState = selector<boolean>({
  key: `${PREFIX}openDetailInNewTabState`,
  get: ({ get }) => {
    const conditionIndex = get(tabIndexState);
    return getConditionField(get(storageState), {
      conditionIndex,
      key: 'openDetailInNewTab',
      defaultValue: false,
    });
  },
  set: ({ get, set }, newValue) => {
    const conditionIndex = get(tabIndexState);
    set(storageState, (current) =>
      updated(current, {
        conditionIndex,
        key: 'openDetailInNewTab',
        value: newValue as boolean,
      })
    );
  },
});
