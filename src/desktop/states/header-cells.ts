import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { appPropertiesAtom, propertiesReadyAtom } from './kintone';
import { pluginConditionAtom } from './plugin';

export type HeaderCell = { label: string; property: kintoneAPI.FieldProperty | null };

export const headerCellsAtom = atom<Promise<HeaderCell[]>>(async (get) => {
  const condition = get(pluginConditionAtom);
  const appFields = get(appPropertiesAtom);
  const propertiesReady = get(propertiesReadyAtom);

  if (!condition?.viewFields.length) {
    return [];
  }

  if (!propertiesReady) {
    return condition.viewFields.map((field) => ({ label: field.fieldCode, property: null }));
  }

  const cells = condition.viewFields.map<HeaderCell>(({ fieldCode, displayName }) => {
    const found = Object.values(appFields).find((property) => property.code === fieldCode);

    if (found) {
      return { label: displayName || found.label, property: found };
    }
    return { label: displayName || fieldCode, property: null };
  });

  return cells;
});
