import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { kx } from '../../../../types/kintone.api';

type Props = DeepReadonly<{ field: kx.field.Creator | kx.field.Modifier }>;

const Component: FC<Props> = ({ field }) => {
  return <>{field.value.name}</>;
};

export default Component;
