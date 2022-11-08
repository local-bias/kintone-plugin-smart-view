import { Tab, TabProps } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { customViewsState } from '../../../states/kintone';
import { viewIdState } from '../../../states/plugin';

type Props = TabProps & { conditionIndex: number };

const Component: FC<Props> = ({ conditionIndex, ...tabProps }) => {
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState(conditionIndex));

  const found = Object.values(views).find((view) => view.id === viewId);

  if (!found) {
    return <Tab label={`設定${conditionIndex + 1}`} {...tabProps} />;
  }

  return <Tab label={`設定${conditionIndex + 1}(${found.name})`} {...tabProps} />;
};

const Container: FC<Props> = (props) => (
  <Suspense fallback={<Tab label={`設定${props.conditionIndex + 1}`} {...props} />}>
    <Component {...props} />
  </Suspense>
);

export default Container;
