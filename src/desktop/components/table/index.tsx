import React, { VFC } from 'react';
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

const Component: VFC<Props> = ({ exists, loading }) => (
  <Layout>
    {!exists && (
      <>
        {loading && <Loading label='レコードを取得しています' />}
        {!loading && <Empty />}
      </>
    )}
    {exists && (
      <table>
        <Head />
        <Body />
      </table>
    )}
  </Layout>
);

const Container: VFC = () => {
  const exists = useRecoilValue(existsRecordState);
  const loading = useRecoilValue(loadingState);

  return <Component {...{ exists, loading }} />;
};

export default Container;
