import React, { FCX } from 'react';
import styled from '@emotion/styled';

const Component: FCX = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 2vw;
  @media screen and (min-width: 800px) {
    padding: 16px;
  }
`;

export default StyledComponent;
