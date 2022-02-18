import { getAppViews } from '@common/kintone';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';

const allAppViewsState = selector({
  key: 'allAppViewsState',
  get: async () => {
    const allViews = await getAppViews();
    return allViews;
  },
});

export const customViewsState = selector({
  key: 'customViewsState',
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
  key: 'listViewsState',
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'LIST');

    return filtered.reduce<Record<string, ViewForResponse>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});
