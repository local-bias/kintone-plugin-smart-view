import React, { FC } from 'react';
import { kx } from '../../../../types/kintone.api';

type Props = { field: kx.field.MultiLineText };

const Component: FC<Props> = (props) => {
  return (
    <>
      {props.field.value.split(/\r?\n/g).map((text, i) => (
        <div key={i}>{text}</div>
      ))}
    </>
  );
};

export default Component;
