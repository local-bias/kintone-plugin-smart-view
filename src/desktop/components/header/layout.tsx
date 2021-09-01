import React, { FCX } from 'react';
import styled from '@emotion/styled';

const Component: FCX = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)`
  padding: 16px 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default StyledComponent;
