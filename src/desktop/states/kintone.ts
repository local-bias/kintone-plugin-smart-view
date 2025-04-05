import { GUEST_SPACE_ID } from '@/lib/global';
import { t } from '@/lib/i18n';
import { downloadFile, getAppId, kintoneAPI } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { resolvedTableColumnsAtom } from './plugin';

export const currentAppIdAtom = atom(() => {
  const appId = getAppId();
  if (!appId) {
    throw new Error(t('desktop.error.appInfoRetrievalFailedError'));
  }
  return String(appId);
});

export const fieldPropertiesAtom = atomFamily((_appId: string) =>
  atom<kintoneAPI.FieldProperties>({})
);

/**
 * 現在のアプリのフィールドプロパティを取得するatom
 *
 * 🚧 マイグレーションにあたり、暫定的にこのatomを参照している可能性があります
 */
export const currentAppFieldPropertiesAtom = atom((get) => {
  const appId = get(currentAppIdAtom);
  const properties = get(fieldPropertiesAtom(appId));
  return properties;
});

export const appFormLayoutAtom = atom<kintoneAPI.Layout>([]);

/**
 * viewFieldのIDを受け取り、そのフィールドのプロパティを返す
 */
export const tableColumnFieldPropertyAtom = atomFamily((columnId: string) =>
  atom<Promise<kintoneAPI.FieldProperty | null>>(async (get) => {
    const columns = get(resolvedTableColumnsAtom);
    const column = columns.find((v) => v.id === columnId);
    if (!column) {
      return null;
    }
    const appProperties = get(fieldPropertiesAtom(column.appId));
    const property = appProperties[column.fieldCode];
    return property ?? null;
  })
);

export const propertiesReadyAtom = atom(false);
export const formLayoutReadyAtom = atom(false);

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
