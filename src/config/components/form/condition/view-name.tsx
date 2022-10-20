import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../../states/kintone';
import { Skeleton } from '@mui/material';
import { viewIdState } from '../../../states/plugin';
import { useConditionIndex } from '../../condition-index-provider';

const Component: FC = () => {
  const conditionIndex = useConditionIndex();
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState(conditionIndex));

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

export default Container;
