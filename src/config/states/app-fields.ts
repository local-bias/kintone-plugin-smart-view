import { selector } from 'recoil';
import { getFieldsWithoutIgnores } from '@/lib/kintone';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from '@/lib/global';

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
