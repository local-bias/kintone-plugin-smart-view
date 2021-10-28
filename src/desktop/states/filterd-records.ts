import { someField } from '@common/kintone';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';
import { allReceivedRecordsState } from './all-received-records';
import { searchTextState } from './search-text';

export const filterdRecordsState = selector<Record[]>({
  key: 'filterdRecordsState',
  get: ({ get }) => {
    const records = get(allReceivedRecordsState);
    const input = get(searchTextState);

    return records.filter((record) => someField(record, input));
  },
});
