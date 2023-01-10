import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { kx } from '../../../../types/kintone.api';

type Props = DeepReadonly<{ field: kx.field.File }>;

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
