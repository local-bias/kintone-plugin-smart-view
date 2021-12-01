import { selector } from 'recoil';
import { appPropertiesState } from './app-properties';
import { pluginConditionState } from './plugin-condition';
import { propertiesReadyState } from './properties-ready';
import { OneOf } from '@kintone/rest-api-client/lib/KintoneFields/types/property';

export type HeaderCell = { label: string; property: OneOf | null };

export const headerCellsState = selector<HeaderCell[]>({
  key: 'headerCellsState',
  get: async ({ get }) => {
    const condition = get(pluginConditionState);
    const appFields = get(appPropertiesState);
    const propertiesReady = get(propertiesReadyState);

    if (!condition?.viewDisplayingFields.length) {
      return [];
    }

    if (!propertiesReady) {
      return condition.viewDisplayingFields.map((field) => ({ label: field, property: null }));
    }

    const cells = condition.viewDisplayingFields.map<HeaderCell>((fieldCode) => {
      const found = Object.values(appFields).find((property) => property.code === fieldCode);

      if (found) {
        return { label: found.label, property: found };
      }
      return { label: fieldCode, property: null };
    });

    return cells;
  },
});
