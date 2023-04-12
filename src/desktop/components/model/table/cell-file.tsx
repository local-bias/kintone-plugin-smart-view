import React, { FC, FCX, Suspense } from 'react';
import type { DeepReadonly } from 'utility-types';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { useRecoilValue } from 'recoil';
import { fileUrlState } from '../../../states/kintone';
import { Skeleton } from '@mui/material';
import styled from '@emotion/styled';

type Props = DeepReadonly<{ field: kintoneAPI.field.File }>;

const Component: FCX<Props> = ({ className, field }) => {
  return (
    <div className={className}>
      {field.value.map((value, i) => (
        <File key={i} file={value} />
      ))}
    </div>
  );
};

const File: FC<{ file: kintoneAPI.field.File['value'][number] }> = ({ file }) => {
  const fileUrl = useRecoilValue(fileUrlState(file.fileKey));
  if (!fileUrl) {
    return null;
  }
  if (/^image\//.test(file.contentType)) {
    return <img loading='lazy' src={fileUrl} />;
  }
  return <a>{file.name}</a>;
};

const StyledComponent = styled(Component)`
  display: flex;
  gap: 8px;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='rounded' width={50} height={50} />}>
      <StyledComponent {...props} />
    </Suspense>
  );
};

export default Container;
