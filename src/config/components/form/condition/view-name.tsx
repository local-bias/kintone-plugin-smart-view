import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../../states/kintone';
import { Skeleton } from '@mui/material';
import { viewIdState } from '../../../states/plugin';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState(conditionIndex));

  if (!views) {
    return <Skeleton width={100} />;
  }

  const found = Object.values(views).find((view) => view.id === viewId);

  if (!found) {
    return null;
  }

  return <> ({found.name})</>;
};

export default Container;
