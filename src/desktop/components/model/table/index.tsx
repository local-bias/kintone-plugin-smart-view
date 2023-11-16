import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { existsRecordState, isFetchCompleteState } from '../../../states/records';

import { MyTable } from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import ErrorNofitication from './error';
import { errorState, pluginConditionState } from '../../../states/plugin';

const Table: FC = () => {
  const condition = useRecoilValue(pluginConditionState);
  const exists = useRecoilValue(existsRecordState);
  const isFetchComplete = useRecoilValue(isFetchCompleteState);

  if (isFetchComplete && !exists) {
    return null;
  }
  return (
    <MyTable columns={condition?.viewFields.map(({ width }) => ({ width })) ?? []}>
      <Head />
      <Body />
    </MyTable>
  );
};

const PlaceHolder: FC = () => {
  const exists = useRecoilValue(existsRecordState);
  const error = useRecoilValue(errorState);
  const isFetchComplete = useRecoilValue(isFetchCompleteState);

  if (error) {
    return <ErrorNofitication />;
  }

  if (!isFetchComplete || exists) {
    return null;
  }

  return <Empty />;
};

const Component: FC = () => (
  <div>
    <PlaceHolder />
    <Table />
  </div>
);

export default Component;
