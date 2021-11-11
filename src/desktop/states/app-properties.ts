import { atom } from 'recoil';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

export const appPropertiesState = atom<Properties>({
  key: 'appPropertiesState',
  default: {},
});
