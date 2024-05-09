import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = DeepReadonly<{ field: kintoneAPI.field.Creator | kintoneAPI.field.Modifier }>;

const Component: FC<Props> = ({ field }) => {
  return <>{field.value.name}</>;
};

export default Component;
