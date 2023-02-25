import React, { Suspense, FC } from 'react';
import { useRecoilValue } from 'recoil';

import { existsRecordState } from '../../../states/records';

import Layout from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import ErrorNofitication from './error';
import { Loading } from '@common/components/loading';
import { errorState, loadingState } from '../../../states/plugin';

const Table: FC = () => {
  const exists = useRecoilValue(existsRecordState);

  if (!exists) {
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
  const loading = useRecoilValue(loadingState);

  if (error) {
    return <ErrorNofitication />;
  }

  if (exists) {
    return null;
  }

  if (loading) {
    return <Loading label='レコードを取得しています' />;
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
