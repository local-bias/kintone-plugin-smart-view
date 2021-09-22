import { selector } from 'recoil';
import { appFieldsState } from './app-fields';
import { pluginConditionState } from './plugin-condition';

export const headerCellsState = selector<string[]>({
  key: 'headerCellsState',
  get: async ({ get }) => {
    const condition = get(pluginConditionState);
    const appFields = get(appFieldsState);

    if (!condition?.viewDisplayingFields.length) {
      return [];
    }

    const cells = condition.viewDisplayingFields.map((fieldCode) => {
      const found = Object.entries(appFields).find(([code]) => code === fieldCode);
      return found ? found[1].label ?? '' : '';
    });

    return cells;
  },
});
