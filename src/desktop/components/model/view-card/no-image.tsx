import styled from '@emotion/styled';
import React, { FCX } from 'react';

const Component: FCX = ({ className }) => (
  <div className={className}>
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='48px' height='48px' viewBox='0 0 32 32'>
        <path
          fill='currentColor'
          d='M30 3.414L28.586 2L2 28.586L3.414 30l2-2H26a2.003 2.003 0 0 0 2-2V5.414zM26 26H7.414l7.793-7.793l2.379 2.379a2 2 0 0 0 2.828 0L22 19l4 3.997zm0-5.832l-2.586-2.586a2 2 0 0 0-2.828 0L19 19.168l-2.377-2.377L26 7.414zM6 22v-3l5-4.997l1.373 1.374l1.416-1.416l-1.375-1.375a2 2 0 0 0-2.828 0L6 16.172V6h16V4H6a2 2 0 0 0-2 2v16z'
        />
      </svg>
      <div>NO IMAGE</div>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  background-color: #f3f0ee;
  display: grid;
  place-items: center;

  > div {
    display: grid;
    gap: 8px;
    place-items: center;
    color: #0008;
  }
`;

export default StyledComponent;
