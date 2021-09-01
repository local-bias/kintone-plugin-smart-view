import { Record } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';
import { allReceivedRecordsState } from './all-received-records';
import { searchTextState } from './search-text';

export const filterdRecordsState = selector<Record[]>({
  key: 'filterdRecordsState',
  get: ({ get }) => {
    const records = get(allReceivedRecordsState);
    const input = get(searchTextState);

    return records.filter((record) =>
      Object.values(record).some(({ value }) => {
        if (!Array.isArray(value)) {
          if (!value) {
            return false;
          } else if (typeof value === 'string') {
            return ~value.indexOf(input);
          } else {
            return ~value.name.indexOf(input);
          }
        } else {
          value;
          return false; // 一旦非対応
        }
      })
    );
  },
});
