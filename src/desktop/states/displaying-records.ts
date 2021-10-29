import { Record } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';
import { filteredRecordsState } from './filtered-records';
import { paginationChunkState } from './pagination-chunk';
import { paginationIndexState } from './pagination-index';

export const displayingRecordsState = selector<Record[]>({
  key: 'displayingRecordsState',
  get: ({ get }) => {
    const records = get(filteredRecordsState);
    const index = get(paginationIndexState);
    const chunk = get(paginationChunkState);

    return records.slice((index - 1) * chunk, index * chunk);
  },
});
