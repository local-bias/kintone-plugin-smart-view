import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import type { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{ field: kintoneAPI.field.MultiSelect }>;

const MultiSelectFieldValue: FC<Props> = (props) => {
  return (
    <>
      {props.field.value.map((value, i) => (
        <div key={i}>{value}</div>
      ))}
    </>
  );
};

export default MultiSelectFieldValue;
