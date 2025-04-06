import { getFieldValueAsString, getYuruChara } from '@konomi-app/kintone-utilities';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import type { TableRow } from '../static';
import { currentAppIdAtom } from './kintone';
import { paginationChunkAtom, paginationIndexAtom } from './pagination';
import { extractedSearchConditionsAtom, pluginConditionAtom, yuruCharaOptionsAtom } from './plugin';
import { searchTextAtom } from './search-text';
import { sortingAtom } from './sorting';

export const allTableRowsAtom = atom<TableRow[]>([]);

const sortedTableRowsAtom = atom<TableRow[]>((get) => {
  const records = get(allTableRowsAtom);
  const sorting = get(sortingAtom);
  const condition = get(pluginConditionAtom);

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
});

export const filteredTableRowsAtom = atom<TableRow[]>((get) => {
  const records = get(sortedTableRowsAtom);
  const text = get(searchTextAtom);
  const condition = get(pluginConditionAtom)!;
  const yuruCharaOptions = get(yuruCharaOptionsAtom);
  const extractedSearchConditions = condition.extractedInputs.map((_, i) =>
    get(extractedSearchConditionsAtom(i))
  ) as Plugin.ExtractedSearchCondition[];

  const input = getYuruChara(text, yuruCharaOptions);

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
          const input = getYuruChara(value, yuruCharaOptions);

          const fieldValue = getYuruChara(getFieldValueAsString(field), yuruCharaOptions);

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

  return lastFiltered;
});

export const displayingTableRowsAtom = atom<TableRow[]>((get) => {
  const records = get(filteredTableRowsAtom);
  const index = get(paginationIndexAtom);
  const chunk = get(paginationChunkAtom);

  return records.slice((index - 1) * chunk, index * chunk);
});

export const areAllRecordsReadyAtom = atomFamily((_appId: string) => atom<boolean>(false));

export const areAllCurrentAppRecordsReadyAtom = atom<boolean>((get) => {
  return get(areAllRecordsReadyAtom(get(currentAppIdAtom)));
});

export const isRecordPresentAtom = atom<boolean>((get) => {
  const records = get(filteredTableRowsAtom);
  return !!records.length;
});

export const isOriginalTableShownAtom = atom<boolean>((get) => {
  const areAllRecordsReady = get(areAllCurrentAppRecordsReadyAtom);
  const isRecordPresent = get(isRecordPresentAtom);
  return !areAllRecordsReady || isRecordPresent;
});

export const autocompleteValuesAtom = atomFamily((fieldCode: string) =>
  atom<string[]>((get) => {
    const records = get(allTableRowsAtom);
    return [
      ...new Set(
        records.map((record) =>
          record.record[fieldCode] ? getFieldValueAsString(record.record[fieldCode]) : ''
        )
      ),
    ].filter((v) => v);
  })
);
