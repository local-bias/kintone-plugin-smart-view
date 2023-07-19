import { Skeleton, TabProps } from '@mui/material';
import React, { FC, Suspense, memo } from 'react';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../../states/kintone';
import { storageState } from '../../../states/plugin';

type Props = TabProps & { index: number };

const Component: FC<Props> = ({ index }) => {
  const views = useRecoilValue(customViewsState);
  const config = useRecoilValue(storageState);
  const condition = config.conditions[index];
  const found = Object.values(views).find((view) => view.id === condition.viewId);

  if (!found) {
    return `設定${index + 1}`;
  }

  return `設定${index + 1}(${found.name})`;
};

const Container: FC<Props> = (props) => (
  <Suspense fallback={<Skeleton variant='text' width={100} />}>
    <Component {...props} />
  </Suspense>
);

export default memo(Container);
