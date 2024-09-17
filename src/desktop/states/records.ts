import { atom, selector, selectorFamily } from 'recoil';
import {
  defaultSortConditionState,
  extractedSearchConditionsState,
  pluginConditionState,
} from './plugin';
import { searchTextState } from './search-text';
import { sortingState } from './sorting';
import type { TableRow } from '../static';
import { paginationIndexState, paginationChunkState } from './pagination';
import {
  getFieldValueAsString,
  getYuruChara,
  sortField,
  type kintoneAPI,
} from '@konomi-app/kintone-utilities';

const PREFIX = 'records';

export const allTableRowsState = atom<TableRow[]>({
  key: 'allViewRecordsState',
  default: [],
});

export const defaultSortedTableRowsState = selector<TableRow[]>({
  key: 'defaultSortedViewRecordsState',
  get: ({ get }) => {
    const records = get(allTableRowsState);
    const defaultSort = get(defaultSortConditionState);

    process.env.NODE_ENV === 'development' && console.time('default sorting');

    const sorted = [...records].sort((a, b) => {
      for (const { field, order } of defaultSort) {
        const aValue = a.record[field] as kintoneAPI.Field | undefined;
        const bValue = b.record[field] as kintoneAPI.Field | undefined;
        if (!aValue || !bValue || aValue.value === bValue.value) {
          continue;
        }
        const compared = sortField(aValue, bValue);
        if (order === 'asc') {
          return compared;
        } else {
          return compared * -1;
        }
      }
      return 0;
    });

    process.env.NODE_ENV === 'development' && console.timeEnd('default sorting');

    return sorted;
  },
});

const sortedTableRowsState = selector<TableRow[]>({
  key: 'sortedTableRowsState',
  get: ({ get }) => {
    const records = get(defaultSortedTableRowsState);
    const sorting = get(sortingState);
    const condition = get(pluginConditionState);

    if (!condition?.isSortable || !sorting.field) {
      return records;
    }

    process.env.NODE_ENV === 'development' && console.time('sorting');

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

    process.env.NODE_ENV === 'development' && console.timeEnd('sorting');

    return sorted;
  },
});

export const filteredTableRowsState = selector<kintoneAPI.RecordData[]>({
  key: 'filteredTableRowsState',
  get: ({ get }) => {
    const records = get(sortedTableRowsState);
    const text = get(searchTextState);
    const condition = get(pluginConditionState)!;
    const extractedSearchConditions = condition.extractedInputs.map((_, i) =>
      get(extractedSearchConditionsState(i))
    ) as Plugin.ExtractedSearchCondition[];

    const {
      isCaseSensitive = false,
      isKatakanaSensitive = false,
      isHankakuKatakanaSensitive = false,
      isZenkakuEisujiSensitive = false,
    } = condition || {};

    const input = getYuruChara(text, {
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
          case 'text': {
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
          }
          case 'autocomplete': {
            return getFieldValueAsString(field) === value;
          }
          case 'date': {
            return ~getFieldValueAsString(field).indexOf(value);
          }
          case 'month': {
            const month = value.slice(0, 7);
            return ~getFieldValueAsString(field).indexOf(month);
          }
          case 'year': {
            const year = value.slice(0, 4);
            return ~getFieldValueAsString(field).indexOf(year);
          }
          default: {
            return true;
          }
        }
      })
    );

    process.env.NODE_ENV === 'development' && console.timeEnd('filtering');

    return lastFiltered.map(({ record }) => record);
  },
});

export const displayingTableRowsState = selector<kintoneAPI.RecordData[]>({
  key: 'displayingTableRowsState',
  get: ({ get }) => {
    const records = get(filteredTableRowsState);
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
    const records = get(filteredTableRowsState);
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
      const records = get(allTableRowsState);
      return [
        ...new Set(
          records.map((record) =>
            record.record[fieldCode] ? getFieldValueAsString(record.record[fieldCode]) : ''
          )
        ),
      ].filter((v) => v);
    },
});
