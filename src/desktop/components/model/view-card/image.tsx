import { fileUrlState } from '@/desktop/states/kintone';
import styled from '@emotion/styled';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import React, { FC, FCX, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import NoImage from './no-image';

type Props = { file: kintoneAPI.field.File['value'][number] | null };
type ImageProps = { file: kintoneAPI.field.File['value'][number] };

const Image: FC<ImageProps> = ({ file }) => {
  const fileUrl = useRecoilValue(fileUrlState(file.fileKey));
  if (!fileUrl) {
    return null;
  }
  return <img loading='lazy' src={fileUrl} />;
};

const ImageContainer: FC<ImageProps> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='rectangular' width='100%' height='100%' />}>
      <Image {...props} />
    </Suspense>
  );
};

const Container: FCX<Props> = ({ className, file }) => {
  return <div className={className}>{file ? <ImageContainer file={file} /> : <NoImage />}</div>;
};

const StyledContainer = styled(Container)`
  display: grid;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default StyledContainer;
