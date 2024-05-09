import { sanitize } from 'dompurify';
import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = DeepReadonly<{ field: kintoneAPI.field.RichText }>;

const Component: FC<Props> = (props) => {
  const __html = sanitize(props.field.value);
  return <div dangerouslySetInnerHTML={{ __html }} />;
};

export default Component;
