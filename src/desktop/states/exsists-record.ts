import { selector } from 'recoil';
import { filterdRecordsState } from './filterd-records';

export const existsRecordState = selector({
  key: 'existsRecordState',
  get: ({ get }) => {
    const records = get(filterdRecordsState);

    return !!records.length;
  },
});
