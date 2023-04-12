import { atom, selectorFamily } from 'recoil';
import { downloadFile, kintoneAPI } from '@konomi-app/kintone-utilities';

const PREFIX = 'kintone';

export const appPropertiesState = atom<kintoneAPI.FieldProperties>({
  key: `${PREFIX}appPropertiesState`,
  default: {},
});

export const propertiesReadyState = atom({ key: `${PREFIX}propertiesReadyState`, default: false });

export const fileUrlState = selectorFamily<string | null, string>({
  key: `${PREFIX}fileUrlState`,
  get: (fileKey: string) => async () => {
    const blob = await downloadFile({ fileKey });
    if (!blob) {
      return null;
    }
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  },
});
