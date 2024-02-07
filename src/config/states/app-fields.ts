import { selector } from 'recoil';
import { getFieldsWithoutIgnores } from '@/lib/kintone';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from '@/lib/global';
import { viewFieldsState } from './plugin';

const PREFIX = 'kintone';

export const appFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}appFieldsState`,
  get: async () => {
    const properties = await getFieldsWithoutIgnores({
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
    });

    const values = Object.values(properties);

    return values.sort((a, b) => a.label.localeCompare(b.label, 'ja'));
  },
});

export const extractedInputFieldsState = selector<kintoneAPI.FieldProperty[]>({
  key: `${PREFIX}extractedInputFieldsState`,
  get: async ({ get }) => {
    const viewFields = get(viewFieldsState);
    const fields = get(appFieldsState);

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
  },
});
