import React, { FC } from 'react';
import type { kintoneAPI } from '@lb-ribbit/kintone-utilities';

type Props = { field: kintoneAPI.field.SingleLineText };

const Component: FC<Props> = (props) => {
  return <>{props.field.value}</>;
};

export default Component;
