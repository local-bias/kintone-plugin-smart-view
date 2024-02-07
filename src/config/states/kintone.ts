import { atom, selector } from 'recoil';
import { kintoneAPI } from '@konomi-app/kintone-utilities';

const PREFIX = 'kintone';

export const allAppViewsState = atom<Record<string, kintoneAPI.view.Response>>({
  key: `${PREFIX}allAppViewsState`,
  default: {},
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
