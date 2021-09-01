import { Record } from '@kintone/rest-api-client/lib/client/types';
import { atom } from 'recoil';

export const allReceivedRecordsState = atom<Record[]>({
  key: 'allReceivedRecordsState',
  default: [],
});
