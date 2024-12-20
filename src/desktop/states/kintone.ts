import { GUEST_SPACE_ID } from '@/lib/global';
import { downloadFile, getAppId, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atomFamily } from 'jotai/utils';
import { atom } from 'jotai';

export const currentAppIdAtom = atom(() => {
  const appId = getAppId();
  if (!appId) {
    throw new Error('アプリ情報が取得できませんでした');
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
