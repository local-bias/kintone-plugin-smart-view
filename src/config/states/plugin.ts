import produce from 'immer';
import { atom, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

const updated = <T extends keyof kintone.plugin.Condition>(
  storage: kintone.plugin.Storage | null,
  props: {
    conditionIndex: number;
    key: T;
    value: kintone.plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    if (!draft) {
      return;
    }
    draft.conditions[conditionIndex][key] = value;
  });
};

const getConditionField = <T extends keyof kintone.plugin.Condition>(
  storage: kintone.plugin.Storage | null,
  props: {
    conditionIndex: number;
    key: T;
    defaultValue: NonNullable<kintone.plugin.Condition[T]>;
  }
): NonNullable<kintone.plugin.Condition[T]> => {
  const { conditionIndex, key, defaultValue } = props;
  if (!storage || !storage.conditions[conditionIndex]) {
    return defaultValue;
  }
  return storage.conditions[conditionIndex][key] ?? defaultValue;
};

export const pluginIdState = atom<string>({ key: `${PREFIX}pluginIdState`, default: '' });

export const storageState = atom<kintone.plugin.Storage | null>({
  key: `${PREFIX}storageState`,
  default: null,
});

export const loadingState = atom<boolean>({
  key: `${PREFIX}loadingState`,
  default: false,
});

export const conditionState = selectorFamily<kintone.plugin.Condition | null, number>({
  key: `${PREFIX}conditionState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      const storage = get(storageState);
      return !storage ? null : storage.conditions[conditionIndex] ?? null;
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        produce(current, (draft) => {
          if (!draft) {
            return;
          }
          draft.conditions[conditionIndex] = newValue as kintone.plugin.Condition;
        })
      );
    },
});

export const viewIdState = selectorFamily<string, number>({
  key: `${PREFIX}viewIdState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      return getConditionField(get(storageState), {
        conditionIndex,
        key: 'viewId',
        defaultValue: '',
      });
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key: 'viewId',
          value: newValue as string,
        })
      );
    },
});

export const viewDisplayingFieldsState = selectorFamily<string[], number>({
  key: `${PREFIX}viewDisplayingFieldsState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      return getConditionField(get(storageState), {
        conditionIndex,
        key: 'viewDisplayingFields',
        defaultValue: [''],
      });
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key: 'viewDisplayingFields',
          value: newValue as string[],
        })
      );
    },
});

export const paginationChunkState = selectorFamily<number, number>({
  key: `${PREFIX}paginationChunkState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      return getConditionField(get(storageState), {
        conditionIndex,
        key: 'paginationChunk',
        defaultValue: 100,
      });
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key: 'paginationChunk',
          value: newValue as number,
        })
      );
    },
});

export const enablesPaginationChunkControlState = selectorFamily<boolean, number>({
  key: `${PREFIX}enablesPaginationChunkControlState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      return getConditionField(get(storageState), {
        conditionIndex,
        key: 'enablesPaginationChunkControl',
        defaultValue: false,
      });
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key: 'enablesPaginationChunkControl',
          value: newValue as boolean,
        })
      );
    },
});

export const enableCSVExportState = selectorFamily<boolean, number>({
  key: `${PREFIX}enableCSVExportState`,
  get:
    (conditionIndex) =>
    ({ get }) => {
      return getConditionField(get(storageState), {
        conditionIndex,
        key: 'enableCSVExport',
        defaultValue: false,
      });
    },
  set:
    (conditionIndex) =>
    ({ set }, newValue) => {
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key: 'enableCSVExport',
          value: newValue as boolean,
        })
      );
    },
});
