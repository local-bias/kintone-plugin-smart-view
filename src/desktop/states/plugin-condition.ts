import { atom } from 'recoil';

export const pluginConditionState = atom<kintone.plugin.Condition | null>({
  key: 'pluginConditionState',
  default: null,
});
