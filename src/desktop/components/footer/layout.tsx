import React, { FCX } from 'react';
import styled from '@emotion/styled';

const Component: FCX = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)`
  padding: 8px 16px 16px;
  display: flex;
  justify-content: flex-end;
`;

export default StyledComponent;
