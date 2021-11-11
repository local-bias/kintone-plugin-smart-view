import { selector } from 'recoil';
import { appPropertiesState } from './app-properties';
import { pluginConditionState } from './plugin-condition';
import { propertiesReadyState } from './properties-ready';

export const headerCellsState = selector<string[]>({
  key: 'headerCellsState',
  get: async ({ get }) => {
    const condition = get(pluginConditionState);
    const appFields = get(appPropertiesState);
    const propertiesReady = get(propertiesReadyState);

    if (!condition?.viewDisplayingFields.length) {
      return [];
    }

    if (!propertiesReady) {
      return condition.viewDisplayingFields;
    }

    const cells = condition.viewDisplayingFields.map((fieldCode) => {
      const found = Object.entries(appFields).find(([code]) => code === fieldCode);
      return found ? found[1].label ?? '' : '';
    });

    return cells;
  },
});
