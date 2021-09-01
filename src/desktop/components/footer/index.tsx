import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchTextState } from '../../states/search-text';

import Layout from './layout';
import Pagination from '../header/pagination';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps & DeepReadonly<{}>;

const Component: VFCX<Props> = ({ className }) => (
  <div {...{ className }}>
    <Layout>
      <Pagination />
    </Layout>
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  return <StyledComponent {...{}} />;
};

export default Container;
