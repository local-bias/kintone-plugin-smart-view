import { selector } from 'recoil';
import { appPropertiesState } from './kintone';
import { pluginConditionState } from './plugin';
import { propertiesReadyState } from './kintone';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

export type HeaderCell = { label: string; property: kintoneAPI.FieldProperty | null };

export const headerCellsState = selector<HeaderCell[]>({
  key: 'headerCellsState',
  get: async ({ get }) => {
    const condition = get(pluginConditionState);
    const appFields = get(appPropertiesState);
    const propertiesReady = get(propertiesReadyState);

    if (!condition?.viewFields.length) {
      return [];
    }

    if (!propertiesReady) {
      return condition.viewFields.map((field) => ({ label: field.fieldCode, property: null }));
    }

    const cells = condition.viewFields.map<HeaderCell>(({ fieldCode }) => {
      const found = Object.values(appFields).find((property) => property.code === fieldCode);

      if (found) {
        return { label: found.label, property: found };
      }
      return { label: fieldCode, property: null };
    });

    return cells;
  },
});
