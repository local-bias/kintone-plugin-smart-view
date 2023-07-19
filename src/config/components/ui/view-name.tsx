import React, { FC, memo, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../states/kintone';
import { Skeleton } from '@mui/material';
import { viewIdState } from '../../states/plugin';

const Component: FC = () => {
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState);

  const found = Object.values(views).find((view) => view.id === viewId);

  if (!found) {
    return null;
  }

  return <> ({found.name})</>;
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
