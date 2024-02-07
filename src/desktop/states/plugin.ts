import { atom } from 'recoil';

const PREFIX = 'plugin';

export const pluginConditionState = atom<Plugin.Condition | null>({
  key: `${PREFIX}pluginConditionState`,
  default: null,
});

export const extractedSearchConditionsState = atom<Plugin.ExtractedSearchCondition[]>({
  key: `${PREFIX}extractedSearchConditionsState`,
  default: [],
});

export const loadingState = atom({ key: `${PREFIX}loadingState`, default: true });

export const errorState = atom<string | null>({
  key: `${PREFIX}errorState`,
  default: null,
});
