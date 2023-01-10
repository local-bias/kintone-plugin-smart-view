import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { kx } from '../../../../types/kintone.api';

type Props = DeepReadonly<{ field: kx.field.Date }>;

const Component: FC<Props> = ({ field }) => {
  return <>{field.value ? new Date(field.value).toLocaleDateString() : ''}</>;
};

export default Component;
