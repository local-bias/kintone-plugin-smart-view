import { kx } from '../types/kintone.api';

export type ViewRecord = {
  record: kx.RecordData;
  __quickSearch: string;
};

export const SORTABLE_FIELDS: kx.FieldPropertyType[] = [
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
];
