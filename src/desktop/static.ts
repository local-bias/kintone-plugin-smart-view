import type { kintoneAPI } from '@konomi-app/kintone-utilities';

export type TableRow = {
  record: kintoneAPI.RecordData;
  __quickSearch: string;
};

export const SORTABLE_FIELDS: kintoneAPI.FieldPropertyType[] = [
  'CALC',
  'CREATED_TIME',
  'CREATOR',
  'DATE',
  'DATETIME',
  'DROP_DOWN',
  'LINK',
  'MODIFIER',
  'MULTI_LINE_TEXT',
  'NUMBER',
  'RADIO_BUTTON',
  'RECORD_NUMBER',
  'SINGLE_LINE_TEXT',
  'STATUS',
  'TIME',
  'UPDATED_TIME',
];
