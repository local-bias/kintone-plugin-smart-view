import { Record } from '@kintone/rest-api-client/lib/client/types';
import { selector } from 'recoil';
import { allReceivedRecordsState } from './all-received-records';
import { searchTextState } from './search-text';

export const filterdRecordsState = selector<Record[]>({
  key: 'filterdRecordsState',
  get: ({ get }) => {
    const records = get(allReceivedRecordsState);
    const input = get(searchTextState);

    return records.filter((record) =>
      Object.values(record).some((field) => {
        switch (field.type) {
          case 'CREATOR':
          case 'MODIFIER':
            return ~field.value.name.indexOf(input);

          case 'CHECK_BOX':
          case 'MULTI_SELECT':
          case 'CATEGORY':
            return field.value.some((value) => ~value.indexOf(input));

          case 'USER_SELECT':
          case 'ORGANIZATION_SELECT':
          case 'GROUP_SELECT':
          case 'STATUS_ASSIGNEE':
            return field.value.some(({ name }) => ~name.indexOf(input));

          case 'FILE':
            return field.value.some(({ name }) => name.indexOf(input));

          case 'SUBTABLE':
            return false; // 非対応

          default:
            return field.value && ~field.value.indexOf(input);
        }
      })
    );
  },
});
