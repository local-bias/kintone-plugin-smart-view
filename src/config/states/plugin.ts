import { restorePluginConfig } from '@/lib/plugin';
import { produce } from 'immer';
import { RecoilState, atom, selector, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

const updated = <T extends keyof Plugin.Condition>(
  storage: Plugin.Config,
  props: {
    conditionIndex: number;
    key: T;
    value: Plugin.Condition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const storageState = atom<Plugin.Config>({
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

export const conditionsState = selector<Plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
});

export const conditionLengthState = selector<number>({
  key: `${PREFIX}conditionLengthState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage.conditions.length;
  },
});

export const conditionState = selector<Plugin.Condition | null>({
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
        draft.conditions[conditionIndex] = newValue as Plugin.Condition;
      })
    );
  },
});

export const conditionPropertyState = selectorFamily<
  Plugin.Condition[keyof Plugin.Condition],
  keyof Plugin.Condition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      const conditionIndex = get(tabIndexState);
      const storage = get(storageState);
      return storage.conditions[conditionIndex][key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const conditionIndex = get(tabIndexState);
      set(storageState, (current) =>
        updated(current, {
          conditionIndex,
          key,
          value: newValue as Plugin.Condition[keyof Plugin.Condition],
        })
      );
    },
});

export const getConditionPropertyState = <T extends keyof Plugin.Condition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<Plugin.Condition[T]>;

export const viewIdState = getConditionPropertyState('viewId');
export const viewFieldsState = getConditionPropertyState('viewFields');
export const paginationChunkState = getConditionPropertyState('paginationChunk');
export const extractedInputsState = getConditionPropertyState('extractedInputs');
