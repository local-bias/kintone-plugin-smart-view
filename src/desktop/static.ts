import type { kintoneAPI } from '@konomi-app/kintone-utilities';

export type ViewRecord = {
  record: kintoneAPI.RecordData;
  __quickSearch: string;
};

export const SORTABLE_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'CALC',
  'CREATED_TIME',
  'DATE',
  'DATETIME',
  'LINK',
  'MULTI_LINE_TEXT',
  'NUMBER',
  'SINGLE_LINE_TEXT',
  'TIME',
  'UPDATED_TIME',
  'DROP_DOWN',
];
