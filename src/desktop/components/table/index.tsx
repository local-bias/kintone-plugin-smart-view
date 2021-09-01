import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../../states/loading';

import Table from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';

import { existsRecordState } from '../../states/exsists-record';
import { Loading } from '@common/components/loading';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps & DeepReadonly<{ exists: boolean; loading: boolean }>;

const Component: VFCX<Props> = ({ className, exists, loading }) => (
  <div {...{ className }}>
    {!exists && (
      <>
        {loading && <Loading label='レコードを取得しています' />}
        {!loading && <Empty />}
      </>
    )}
    {exists && (
      <Table hoverEffect>
        <Head />
        <Body />
      </Table>
    )}
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  const exists = useRecoilValue(existsRecordState);
  const loading = useRecoilValue(loadingState);

  return <StyledComponent {...{ exists, loading }} />;
};

export default Container;
