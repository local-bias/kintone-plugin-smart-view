import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getFieldsWithoutIgnores } from '@common/kintone';

export const appFieldsState = selector<Properties>({
  key: 'appFieldsState',
  get: async () => {
    const properties = await getFieldsWithoutIgnores();
    return properties;
  },
});
