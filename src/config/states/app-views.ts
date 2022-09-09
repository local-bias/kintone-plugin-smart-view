import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { atom, selector } from 'recoil';

export const allAppViewsState = atom<Record<string, ViewForResponse> | null>({
  key: 'allAppViewsState',
  default: null,
});

export const customViewsState = selector({
  key: 'customViewsState',
  get: async ({ get }) => {
    const allViews = get(allAppViewsState);
    if (!allViews) {
      return null;
    }

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
    if (!allViews) {
      return null;
    }

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'LIST');

    return filtered.reduce<Record<string, ViewForResponse>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});
