import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { fieldPropertiesAtom, propertiesReadyAtom } from './kintone';
import { resolvedTableColumnsAtom } from './plugin';

export type HeaderCell = { label: string; property: kintoneAPI.FieldProperty | null };

export const headerCellsAtom = atom<HeaderCell[]>((get) => {
  const tableColumns = get(resolvedTableColumnsAtom);
  const propertiesReady = get(propertiesReadyAtom);

  if (!propertiesReady) {
    return tableColumns.map((field) => ({
      label: field.fieldCode,
      property: null,
    }));
  }

  const cells = tableColumns.map<HeaderCell>(({ appId, fieldCode, displayName }) => {
    const properties = get(fieldPropertiesAtom(appId));
    const found = Object.values(properties).find((property) => property.code === fieldCode);

    if (found) {
      return { label: displayName || found.label, property: found };
    }
    return { label: displayName || fieldCode, property: null };
  });

  return cells;
});
