import React, { FCX } from 'react';
import styled from '@emotion/styled';

const Component: FCX = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export default StyledComponent;
