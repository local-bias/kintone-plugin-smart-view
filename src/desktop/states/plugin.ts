import { atom } from 'recoil';

const PREFIX = 'plugin';

export const pluginConditionState = atom<kintone.plugin.Condition | null>({
  key: `${PREFIX}pluginConditionState`,
  default: null,
});

export const loadingState = atom({ key: `${PREFIX}loadingState`, default: true });
