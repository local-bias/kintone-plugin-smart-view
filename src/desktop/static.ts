import { OneOf as KintoneProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';

export const SORTABLE_FIELDS: KintoneProperty['type'][] = [
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
