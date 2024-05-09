import React, { FC } from 'react';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = { field: kintoneAPI.field.MultiLineText };

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
