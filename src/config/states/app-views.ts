import { getAppViews } from '@common/kintone';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';

const state = selector({
  key: 'appViewsState',
  get: async () => {
    const allViews = await getAppViews();

    const filtered = Object.entries(allViews).filter(([_, view]) => view.type === 'CUSTOM');

    return filtered.reduce<Record<string, ViewForResponse>>(
      (acc, [name, view]) => ({ ...acc, [name]: view }),
      {}
    );
  },
});

export default state;
