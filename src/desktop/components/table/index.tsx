import React, { Suspense, FC } from 'react';
import { useRecoilValue } from 'recoil';
import { DeepReadonly } from 'utility-types';

import { loadingState } from '../../states/loading';
import { existsRecordState } from '../../states/exsists-record';

import Layout from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import { Loading } from '@common/components/loading';

type Props = DeepReadonly<{ exists: boolean; loading: boolean }>;

const Component: FC<Props> = ({ exists, loading }) => (
  <Layout>
    {!exists && (
      <>
        {loading && <Loading label='レコードを取得しています' />}
        {!loading && <Empty />}
      </>
    )}
    {exists && (
      <table>
        <Suspense fallback={null}>
          <Head />
        </Suspense>
        <Body />
      </table>
    )}
  </Layout>
);

const Container: FC = () => {
  const exists = useRecoilValue(existsRecordState);
  const loading = useRecoilValue(loadingState);

  return <Component {...{ exists, loading }} />;
};

export default Container;
