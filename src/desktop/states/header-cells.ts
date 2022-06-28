import { selector } from 'recoil';
import { appPropertiesState } from './app-properties';
import { pluginConditionState } from './plugin-condition';
import { propertiesReadyState } from './properties-ready';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/property';

export type HeaderCell = { label: string; property: OneOf | null; width: number };

export const headerCellsState = selector<HeaderCell[]>({
  key: 'headerCellsState',
  get: async ({ get }) => {
    const condition = get(pluginConditionState);
    const appFields = get(appPropertiesState);
    const propertiesReady = get(propertiesReadyState);

    if (!condition?.displayingFields.length) {
      return [];
    }

    if (!propertiesReady) {
      return condition.displayingFields.map(({ code, width }) => ({
        label: code,
        property: null,
        width,
      }));
    }

    const cells = condition.displayingFields.map<HeaderCell>(({ code, width }) => {
      const found = Object.values(appFields).find((property) => property.code === code);

      if (found) {
        return { label: found.label, property: found, width };
      }
      return { label: code, property: null, width };
    });

    return cells;
  },
});
