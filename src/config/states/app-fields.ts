import { GUEST_SPACE_ID, isProd } from '@/lib/global';
import { getFieldsWithoutIgnores } from '@/lib/kintone';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { nanoid } from 'nanoid';
import { clone } from 'remeda';
import { allKintoneAppsAtom, dstAppFieldsAtom } from './kintone';
import { validJoinConditionsAtom, viewFieldsAtom } from './plugin';

export type ViewFieldProperty = kintoneAPI.FieldProperty & {
  appName: string | null;
  joinConditionId: string | null;
};

export const appFieldsAtom = atom<Promise<ViewFieldProperty[]>>(async () => {
  const properties = await getFieldsWithoutIgnores({
    preview: true,
    guestSpaceId: GUEST_SPACE_ID,
  });

  const values = Object.values(properties).map((property) => ({
    ...property,
    appName: null,
    joinConditionId: null,
  }));

  return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
});

export const selectableViewFieldsAtom = atom<Promise<ViewFieldProperty[]>>(async (get) => {
  const rawViewFields = await get(appFieldsAtom);
  const viewFields = clone(rawViewFields);
  const allKintoneApps = await get(allKintoneAppsAtom);
  const joinConditions = get(validJoinConditionsAtom);

  for (const joinCondition of joinConditions) {
    const dstApp = allKintoneApps.find((app) => app.appId === joinCondition.dstAppId);
    const dstFields = await get(dstAppFieldsAtom(joinCondition.dstAppId));
    viewFields.push(
      ...dstFields.map((field) => ({
        ...field,
        id: nanoid(),
        label: dstApp ? `${field.label}` : field.label,
        appName: dstApp ? dstApp.name : null,
        joinConditionId: joinCondition.id,
      }))
    );
  }

  !isProd && console.log({ viewFields });

  return viewFields;
});

export const extractedInputFieldsAtom = atom<Promise<kintoneAPI.FieldProperty[]>>(async (get) => {
  const viewFields = get(viewFieldsAtom);
  const fields = await get(appFieldsAtom);

  return fields.filter((field) => {
    if (viewFields.every((viewField) => viewField.fieldCode !== field.code)) {
      return false;
    }

    return (
      field.type === 'SINGLE_LINE_TEXT' ||
      field.type === 'MULTI_LINE_TEXT' ||
      field.type === 'RADIO_BUTTON' ||
      field.type === 'DROP_DOWN' ||
      field.type === 'CALC' ||
      field.type === 'NUMBER' ||
      field.type === 'DATE' ||
      field.type === 'DATETIME'
    );
  });
});
