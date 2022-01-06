import { atom, selector } from 'recoil';
import { pluginConditionState } from './plugin-condition';
import { searchTextState } from './search-text';
import { sortingState } from './sorting';
import { ViewRecord } from '../static';
import { paginationIndexState, paginationChunkState } from './pagination';
import { Record } from '@kintone/rest-api-client/lib/client/types';

export const allViewRecordsState = atom<ViewRecord[]>({
  key: 'allViewRecordsState',
  default: [],
});

const sortedDatasState = selector<ViewRecord[]>({
  key: 'sortedDatasState',
  get: ({ get }) => {
    const records = get(allViewRecordsState);
    const sorting = get(sortingState);
    const condition = get(pluginConditionState);

    if (!condition?.sortable || !sorting.field) {
      return records;
    }

    const sorted = [...records].sort((dataA, dataB) => {
      const recordA = dataA.record;
      const recordB = dataB.record;

      const a = (recordA[sorting.field]?.value || '') as string;
      const b = (recordB[sorting.field]?.value || '') as string;

      const fieldType = recordA[sorting.field]?.type;

      if (['NUMBER', 'CALC'].includes(fieldType)) {
        const numA = Number(a);
        const numB = Number(b);

        return sorting.order === 'desc' ? numB - numA : numA - numB;
      }

      if (sorting.order === 'desc') {
        return a.localeCompare(b, 'ja') * -1;
      }
      return a.localeCompare(b, 'ja');
    });

    return sorted;
  },
});

export const filteredRecordsState = selector<Record[]>({
  key: 'filteredRecordsState',
  get: ({ get }) => {
    const records = get(sortedDatasState);
    const text = get(searchTextState);
    const condition = get(pluginConditionState);

    const input = condition?.ignoresLetterCase ? text.toLowerCase() : text;

    const words = input.split(/\s+/g);

    const filtered = records.filter(({ __quickSearch }) =>
      words.every((word) => ~__quickSearch.indexOf(word))
    );

    return filtered.map(({ record }) => record);
  },
});

export const displayingRecordsState = selector<Record[]>({
  key: 'displayingRecordsState',
  get: ({ get }) => {
    const records = get(filteredRecordsState);
    const index = get(paginationIndexState);
    const chunk = get(paginationChunkState);

    return records.slice((index - 1) * chunk, index * chunk);
  },
});
