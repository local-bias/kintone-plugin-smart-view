import { getNewCondition, PluginCondition, PluginConfig, restorePluginConfig } from '@/lib/plugin';
import { produce } from 'immer';
import { DefaultValue, RecoilState, atom, selector, selectorFamily } from 'recoil';

const PREFIX = 'plugin';

const updated = <T extends keyof PluginCondition>(
  storage: PluginConfig,
  props: {
    conditionIndex: number;
    key: T;
    value: PluginCondition[T];
  }
) => {
  const { conditionIndex, key, value } = props;
  return produce(storage, (draft) => {
    draft.conditions[conditionIndex][key] = value;
  });
};

export const storageState = atom<PluginConfig>({
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

export const selectedConditionState = selector<PluginCondition>({
  key: `${PREFIX}selectedConditionState`,
  get: ({ get }) => {
    const storage = get(storageState);
    const selectedConditionId = get(selectedConditionIdState);
    return (
      storage.conditions.find((condition) => condition.id === selectedConditionId) ??
      storage.conditions[0]
    );
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    const selectedConditionId = get(selectedConditionIdState);
    set(conditionsState, (current) =>
      produce(current, (draft) => {
        const index = draft.findIndex((condition) => condition.id === selectedConditionId);
        if (index !== -1) {
          draft[index] = newValue;
        }
      })
    );
  },
});

export const conditionsState = selector<PluginCondition[]>({
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

export const conditionState = selector<PluginCondition | null>({
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
        draft.conditions[conditionIndex] = newValue as PluginCondition;
      })
    );
  },
});

const conditionPropertyState = selectorFamily<
  PluginCondition[keyof PluginCondition],
  keyof PluginCondition
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

export const getConditionPropertyState = <T extends keyof PluginCondition>(property: T) =>
  conditionPropertyState(property) as unknown as RecoilState<PluginCondition[T]>;

export const viewIdState = getConditionPropertyState('viewId');
export const viewFieldsState = getConditionPropertyState('viewFields');
export const paginationChunkState = getConditionPropertyState('paginationChunk');
export const extractedInputsState = getConditionPropertyState('extractedInputs');

export const selectedViewFieldDetailSettingIndexState = atom<number | null>({
  key: `${PREFIX}selectedViewFieldDetailSettingIndexState`,
  default: null,
});
