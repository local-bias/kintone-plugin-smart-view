import React, { FC } from 'react';
import TableView from '../table';
import CardView from '../view-card';
import { useRecoilValue } from 'recoil';
import { errorState, viewTypeState } from '@/desktop/states/plugin';
import { isOriginalTableShownState } from '@/desktop/states/records';
import ErrorNofitication from './error';
import Empty from './empty';

const Component: FC = () => {
  const viewType = useRecoilValue(viewTypeState);
  const error = useRecoilValue(errorState);
  const isOriginalTableShown = useRecoilValue(isOriginalTableShownState);

  if (error) {
    return <ErrorNofitication />;
  }
  if (!isOriginalTableShown) {
    return <Empty />;
  }
  if (viewType === 'card') {
    return <CardView />;
  }
  return <TableView />;
};

export default Component;
