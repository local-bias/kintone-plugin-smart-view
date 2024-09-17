import { getNewCondition, restorePluginConfig } from '@/lib/plugin';
import { produce } from 'immer';
import { DefaultValue, RecoilState, atom, selector, selectorFamily } from 'recoil';

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
  default: true,
});

export const tabIndexState = atom<number>({
  key: `${PREFIX}tabIndexState`,
  default: 0,
});

export const selectedConditionIdState = atom<string>({
  key: `${PREFIX}selectedConditionIdState`,
  default: selector<string>({
    key: `${PREFIX}selectedConditionIdState/default`,
    get: ({ get }) => {
      const storage = get(storageState);
      return storage.conditions[0].id;
    },
  }),
});

export const selectedConditionState = selector<Plugin.Condition>({
  key: `${PREFIX}selectedConditionState`,
  get: ({ get }) => {
    const storage = get(storageState);
    const selectedConditionId = get(selectedConditionIdState);
    return (
      storage.conditions.find((condition) => condition.id === selectedConditionId) ??
      storage.conditions[0]
    );
  },
});

export const conditionsState = selector<Plugin.Condition[]>({
  key: `${PREFIX}conditionsState`,
  get: ({ get }) => {
    const storage = get(storageState);
    return storage?.conditions ?? [];
  },
  set: ({ set }, newValue) => {
    set(storageState, (current) => {
      if (newValue instanceof DefaultValue) {
        return { ...current, conditions: [getNewCondition()] };
      }
      return { ...current, conditions: newValue };
    });
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

const conditionPropertyState = selectorFamily<
  Plugin.Condition[keyof Plugin.Condition],
  keyof Plugin.Condition
>({
  key: `${PREFIX}conditionPropertyState`,
  get:
    (key) =>
    ({ get }) => {
      return get(selectedConditionState)[key];
    },
  set:
    (key) =>
    ({ get, set }, newValue) => {
      const conditionId = get(selectedConditionState).id;
      set(storageState, (current) => {
        if (newValue instanceof DefaultValue) {
          return current;
        }
        const conditionIndex = current.conditions.findIndex(
          (condition) => condition.id === conditionId
        );
        return updated(current, { conditionIndex, key, value: newValue });
      });
    },
});

export const getConditionPropertyState = <T extends keyof Plugin.Condition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<Plugin.Condition[T]>;

export const viewIdState = getConditionPropertyState('viewId');
export const viewFieldsState = getConditionPropertyState('viewFields');
export const paginationChunkState = getConditionPropertyState('paginationChunk');
export const extractedInputsState = getConditionPropertyState('extractedInputs');
