import { atom, selector, selectorFamily } from 'recoil';
import { extractedSearchConditionsState, pluginConditionState } from './plugin';
import { searchTextState } from './search-text';
import { sortingState } from './sorting';
import type { ViewRecord } from '../static';
import { paginationIndexState, paginationChunkState } from './pagination';
import {
  getFieldValueAsString,
  getYuruChara,
  type kintoneAPI,
} from '@konomi-app/kintone-utilities';

const PREFIX = 'records';

export const allViewRecordsState = atom<ViewRecord[]>({
  key: 'allViewRecordsState',
  default: [],
});

const sortedViewRecordsState = selector<ViewRecord[]>({
  key: 'sortedViewRecordsState',
  get: ({ get }) => {
    const records = get(allViewRecordsState);
    const sorting = get(sortingState);
    const condition = get(pluginConditionState);

    if (!condition?.isSortable || !sorting.field) {
      return records;
    }

    const sorted = [...records].sort((dataA, dataB) => {
      const recordA = dataA.record;
      const recordB = dataB.record;

      const a = getFieldValueAsString(recordA[sorting.field]);
      const b = getFieldValueAsString(recordB[sorting.field]);

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

export const filteredRecordsState = selector<kintoneAPI.RecordData[]>({
  key: 'filteredRecordsState',
  get: ({ get }) => {
    const records = get(sortedViewRecordsState);
    const text = get(searchTextState);
    const condition = get(pluginConditionState);
    const extractedSearchConditions = get(extractedSearchConditionsState);

    const {
      isCaseSensitive = true,
      isKatakanaSensitive = true,
      isHankakuKatakanaSensitive = true,
      isZenkakuEisujiSensitive = true,
    } = condition || {};

    let input = getYuruChara(text, {
      isCaseSensitive,
      isKatakanaSensitive,
      isHankakuKatakanaSensitive,
      isZenkakuEisujiSensitive,
    });

    const words = input.split(/\s+/g);

    process.env.NODE_ENV === 'development' && console.time('filtering');

    const firstFiltered = records.filter(({ __quickSearch }) =>
      words.every((word) => ~__quickSearch.indexOf(word))
    );

    const lastFiltered = firstFiltered.filter(({ record }) =>
      extractedSearchConditions.slice(0, 1).every(({ type, value, fieldCode }) => {
        if (!fieldCode || !value || !record[fieldCode]) {
          return true;
        }

        const field = record[fieldCode];

        switch (type) {
          case 'text':
            const input = getYuruChara(value, {
              isCaseSensitive,
              isKatakanaSensitive,
              isHankakuKatakanaSensitive,
              isZenkakuEisujiSensitive,
            });

            const fieldValue = getYuruChara(getFieldValueAsString(field), {
              isCaseSensitive,
              isKatakanaSensitive,
              isHankakuKatakanaSensitive,
              isZenkakuEisujiSensitive,
            });

            const words = input.split(/\s+/g);

            return words.every((word) => {
              return ~fieldValue.indexOf(word);
            });
          case 'autocomplete':
            return getFieldValueAsString(field) === value;
          case 'date':
            return ~getFieldValueAsString(field).indexOf(value);
          case 'month':
            const month = value.slice(0, 7);
            return ~getFieldValueAsString(field).indexOf(month);
          case 'year':
            const year = value.slice(0, 4);
            return ~getFieldValueAsString(field).indexOf(year);
          default:
            return true;
        }
      })
    );

    process.env.NODE_ENV === 'development' && console.timeEnd('filtering');

    return lastFiltered.map(({ record }) => record);
  },
});

export const displayingRecordsState = selector<kintoneAPI.RecordData[]>({
  key: 'displayingRecordsState',
  get: ({ get }) => {
    const records = get(filteredRecordsState);
    const index = get(paginationIndexState);
    const chunk = get(paginationChunkState);

    return records.slice((index - 1) * chunk, index * chunk);
  },
});

export const areAllRecordsReadyState = atom<boolean>({
  key: `${PREFIX}areAllRecordsReadyState`,
  default: false,
});

export const isRecordPresentState = selector<boolean>({
  key: `${PREFIX}isRecordPresentState`,
  get: ({ get }) => {
    const records = get(filteredRecordsState);
    return !!records.length;
  },
});

export const isOriginalTableShownState = selector<boolean>({
  key: `${PREFIX}isOriginalTableShownState`,
  get: ({ get }) => {
    const areAllRecordsReady = get(areAllRecordsReadyState);
    const isRecordPresent = get(isRecordPresentState);
    return !areAllRecordsReady || isRecordPresent;
  },
});

export const autocompleteValuesState = selectorFamily<string[], string>({
  key: `${PREFIX}autocompleteValuesState`,
  get:
    (fieldCode) =>
    ({ get }) => {
      const records = get(allViewRecordsState);
      return [
        ...new Set(records.map((record) => getFieldValueAsString(record.record[fieldCode]))),
      ].filter((v) => v);
    },
});
