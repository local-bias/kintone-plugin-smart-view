import React, { Suspense, FC } from 'react';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../../states/loading';
import { existsRecordState } from '../../states/exsists-record';

import Layout from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import { Loading } from '@common/components/loading';

const Table: FC = () => {
  const exists = useRecoilValue(existsRecordState);

  if (!exists) {
    return null;
  }
  return (
    <table>
      <Suspense fallback={null}>
        <Head />
      </Suspense>
      <Body />
    </table>
  );
};

const PlaceHolder: FC = () => {
  const exists = useRecoilValue(existsRecordState);
  const loading = useRecoilValue(loadingState);

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
