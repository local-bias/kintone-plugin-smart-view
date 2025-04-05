import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';

type Props = { field: kintoneAPI.field.MultiLineText };

const MultiLineTextFieldValue: FC<Props> = (props) => {
  return (
    <>
      {props.field.value.split(/\r?\n/g).map((text, i) => (
        <div key={i}>{text}</div>
      ))}
    </>
  );
};

export default MultiLineTextFieldValue;
