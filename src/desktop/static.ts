import { OneOf as KintoneProperty } from '@kintone/rest-api-client/lib/KintoneFields/types/property';

export const SORTABLE_FIELDS: KintoneProperty['type'][] = [
  'SINGLE_LINE_TEXT',
  'LINK',
  'MULTI_LINE_TEXT',
  'DATE',
  'DATETIME',
  'TIME',
];
