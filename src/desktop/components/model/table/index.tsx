import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { existsRecordState, isFetchCompleteState } from '../../../states/records';

import Layout from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import ErrorNofitication from './error';
import { errorState } from '../../../states/plugin';

const Table: FC = () => {
  const exists = useRecoilValue(existsRecordState);
  const isFetchComplete = useRecoilValue(isFetchCompleteState);

  if (isFetchComplete && !exists) {
    return null;
  }
  return (
    <table>
      <Head />
      <Body />
    </table>
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
  <Layout>
    <PlaceHolder />
    <Table />
  </Layout>
);

export default Component;
