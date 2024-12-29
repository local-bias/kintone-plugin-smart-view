import { GUEST_SPACE_ID } from '@/lib/global';
import { t } from '@/lib/i18n';
import { downloadFile, getAppId, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const currentAppIdAtom = atom(() => {
  const appId = getAppId();
  if (!appId) {
    throw new Error(t('desktop.error.appInfoRetrievalFailedError'));
  }
  return appId;
});

export const appPropertiesAtom = atom<kintoneAPI.FieldProperties>({});

export const propertiesReadyAtom = atom(false);

export const fileUrlAtom = atomFamily((fileKey: string) =>
  atom<Promise<string | null>>(async () => {
    const blob = await downloadFile({
      fileKey,
      guestSpaceId: GUEST_SPACE_ID,
    });
    if (!blob) {
      return null;
    }
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    return url;
  })
);
