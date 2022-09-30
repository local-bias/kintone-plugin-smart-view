import { atom } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

const PREFIX = 'kintone';

export const appPropertiesState = atom<Properties>({
  key: `${PREFIX}appPropertiesState`,
  default: {},
});

export const propertiesReadyState = atom({ key: `${PREFIX}propertiesReadyState`, default: false });
