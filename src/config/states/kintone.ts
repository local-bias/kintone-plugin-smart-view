import { kintoneClient } from '@common/kintone';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { getAppId } from '@lb-ribbit/kintone-xapp';
import { selector } from 'recoil';

const PREFIX = 'kintone';

export const allAppViewsState = selector<Record<string, ViewForResponse>>({
  key: `${PREFIX}allAppViewsState`,
  get: async () => {
    const app = getAppId();
    if (!app) {
      throw new Error('アプリのフィールド情報が取得できませんでした');
    }

    const { views } = await kintoneClient.app.getViews({ app, preview: true });
    return views;
  },
});

export const customViewsState = selector({
  key: `${PREFIX}customViewsState`,
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'CUSTOM');

    return filtered.reduce<Record<string, ViewForResponse>>(
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

    return filtered.reduce<Record<string, ViewForResponse>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});
