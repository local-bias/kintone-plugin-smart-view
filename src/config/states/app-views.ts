import { getAppViews } from '@common/kintone';
import { selector } from 'recoil';

const state = selector({ key: 'appViewsState', get: async () => getAppViews() });

export default state;
