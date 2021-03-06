import { selector } from 'recoil';
import { filteredRecordsState } from './records';

export const existsRecordState = selector({
  key: 'existsRecordState',
  get: ({ get }) => {
    const records = get(filteredRecordsState);

    return !!records.length;
  },
});
