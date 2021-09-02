import React, { FCX } from 'react';
import styled from '@emotion/styled';

const Component: FCX = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 1000px) {
    .ribbit-pagination {
      display: none;
    }
  }
`;

export default StyledComponent;
