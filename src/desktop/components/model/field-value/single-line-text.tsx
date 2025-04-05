import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';

type Props = { field: kintoneAPI.field.SingleLineText };

const SingleLineTextFieldValue: FC<Props> = (props) => {
  return <>{props.field.value}</>;
};

export default SingleLineTextFieldValue;
