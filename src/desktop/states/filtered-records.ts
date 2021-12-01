import { someField } from '@common/kintone';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';
import { allReceivedRecordsState } from './all-received-records';
import { pluginConditionState } from './plugin-condition';
import { searchTextState } from './search-text';
import { sortingState } from './sorting';

export const filteredRecordsState = selector<Record[]>({
  key: 'filteredRecordsState',
  get: ({ get }) => {
    const records = get(allReceivedRecordsState);
    const input = get(searchTextState);
    const sorting = get(sortingState);
    const condition = get(pluginConditionState);

    const words = input.split(/\s+/g);

    if (!condition?.sortable || !sorting.field) {
      return records.filter((record) => words.every((word) => someField(record, word)));
    }

    const sorted = [...records].sort((recordA, recordB) => {
      const a = (recordA[sorting.field]?.value || '') as string;
      const b = (recordB[sorting.field]?.value || '') as string;

      if (sorting.order === 'desc') {
        return a.localeCompare(b, 'ja') * -1;
      }
      return a.localeCompare(b, 'ja');
    });

    return sorted.filter((record) => words.every((word) => someField(record, word)));
  },
});
