import React, { FC } from 'react';
import { kx } from '../../../../types/kintone.api';

type Props = { field: kx.field.SingleLineText };

const Component: FC<Props> = (props) => {
  return <>{props.field.value}</>;
};

export default Component;
