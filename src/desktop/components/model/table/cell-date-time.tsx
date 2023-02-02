import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@lb-ribbit/kintone-utilities';

type Props = DeepReadonly<{
  field: kintoneAPI.field.DateTime | kintoneAPI.field.CreatedTime | kintoneAPI.field.UpdatedTime;
}>;

const Component: FC<Props> = ({ field }) => {
  return <>{field.value ? new Date(field.value).toLocaleString() : ''}</>;
};

export default Component;