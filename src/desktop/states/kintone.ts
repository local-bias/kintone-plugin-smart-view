import { atom } from 'recoil';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

const PREFIX = 'kintone';

export const appPropertiesState = atom<kintoneAPI.FieldProperties>({
  key: `${PREFIX}appPropertiesState`,
  default: {},
});

export const propertiesReadyState = atom({ key: `${PREFIX}propertiesReadyState`, default: false });
