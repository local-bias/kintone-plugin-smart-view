import React, { FC } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import Images from './images';
import Links from './links';

type Props = DeepReadonly<{ field: kintoneAPI.field.File }>;

const Component: FC<Props> = ({ field }) => {
  const files = field.value;

  let images: kintoneAPI.field.File['value'] = [];
  let others: kintoneAPI.field.File['value'] = [];

  for (const file of files) {
    if (/^image\//.test(file.contentType)) {
      images.push(file);
    } else {
      others.push(file);
    }
  }

  return (
    <>
      <Images files={images} />
      <Links files={others} />
    </>
  );
};

export default Component;
