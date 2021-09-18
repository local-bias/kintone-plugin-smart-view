import { selector } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import { getFieldsWithoutIgnores } from '@common/kintone';

const state = selector<Properties>({
  key: 'AppFields',
  get: async () => {
    const properties = await getFieldsWithoutIgnores();
    return properties;
  },
});

export default state;
