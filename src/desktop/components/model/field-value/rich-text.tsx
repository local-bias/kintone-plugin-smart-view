import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';

type Props = DeepReadonly<{ field: kintoneAPI.field.RichText }>;

const Component: FC<Props> = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.field.value }} />;
};

export default Component;
