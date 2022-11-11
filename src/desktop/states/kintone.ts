import { atom } from 'recoil';
import { kx } from '../../types/kintone.api';

const PREFIX = 'kintone';

export const appPropertiesState = atom<kx.FieldProperties>({
  key: `${PREFIX}appPropertiesState`,
  default: {},
});

export const propertiesReadyState = atom({ key: `${PREFIX}propertiesReadyState`, default: false });
