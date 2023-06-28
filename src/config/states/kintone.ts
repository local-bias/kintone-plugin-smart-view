import { getAppId } from '@lb-ribbit/kintone-xapp';
import { selector } from 'recoil';
import { getViews, kintoneAPI } from '@konomi-app/kintone-utilities';
import { GUEST_SPACE_ID } from '@/common/global';

const PREFIX = 'kintone';

export const allAppViewsState = selector<Record<string, kintoneAPI.view.Response>>({
  key: `${PREFIX}allAppViewsState`,
  get: async () => {
    const app = getAppId();
    if (!app) {
      throw new Error('アプリのフィールド情報が取得できませんでした');
    }

    const { views } = await getViews({
      app,
      preview: true,
      guestSpaceId: GUEST_SPACE_ID,
      debug: process.env.NODE_ENV === 'development',
    });
    return views;
  },
});

export const customViewsState = selector({
  key: `${PREFIX}customViewsState`,
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'CUSTOM');

    return filtered.reduce<Record<string, kintoneAPI.view.Response>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});

export const listViewsState = selector({
  key: `${PREFIX}listViewsState`,
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'LIST');

    return filtered.reduce<Record<string, kintoneAPI.view.Response>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});
