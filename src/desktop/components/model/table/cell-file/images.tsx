import styled from '@emotion/styled';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import React, { FC, FCX, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { fileUrlState } from '../../../../states/kintone';

type Props = { files: kintoneAPI.field.File['value'] };
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
    <Suspense fallback={<Skeleton variant='rounded' width={50} height={50} />}>
      <Image {...props} />
    </Suspense>
  );
};

const Container: FCX<Props> = ({ className, files }) => {
  return (
    <div className={className}>
      {files.map((file, i) => (
        <ImageContainer key={i} file={file} />
      ))}
    </div>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

export default StyledContainer;
