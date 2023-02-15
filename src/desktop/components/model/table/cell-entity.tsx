import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = DeepReadonly<{
  field:
    | kintoneAPI.field.UserSelect
    | kintoneAPI.field.GroupSelect
    | kintoneAPI.field.OrganizationSelect
    | kintoneAPI.field.StatusAssignee;
}>;

const Component: FC<Props> = ({ field }) => {
  return (
    <>
      {field.value.map((value, i) => (
        <div key={i}>{value.name}</div>
      ))}
    </>
  );
};

export default Component;
