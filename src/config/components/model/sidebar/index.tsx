import styled from '@emotion/styled';
import React, { FCX } from 'react';

import AdditionButton from './condition-addition-button';
import Tabs from './condition-tabs';

const Component: FCX = ({ className }) => (
  <div className={className}>
    <div className='condition-tab'>
      <AdditionButton />
      <Tabs />
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  grid-area: sidebar;

  .condition-tab {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-right: 1px solid #0001;
    height: 100%;
  }
`;

export default StyledComponent;
