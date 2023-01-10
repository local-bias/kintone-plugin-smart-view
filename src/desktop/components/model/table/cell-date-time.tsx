import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { kx } from '../../../../types/kintone.api';

type Props = DeepReadonly<{
  field: kx.field.DateTime | kx.field.CreatedTime | kx.field.UpdatedTime;
}>;

const Component: FC<Props> = ({ field }) => {
  return <>{field.value ? new Date(field.value).toLocaleString() : ''}</>;
};

export default Component;
