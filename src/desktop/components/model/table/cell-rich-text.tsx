import { sanitize } from 'dompurify';
import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { kx } from '../../../../types/kintone.api';

type Props = DeepReadonly<{ field: kx.field.RichText }>;

const Component: FC<Props> = (props) => {
  const __html = sanitize(props.field.value);
  return <div dangerouslySetInnerHTML={{ __html }} />;
};

export default Component;
