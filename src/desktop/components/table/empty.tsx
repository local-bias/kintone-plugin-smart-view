import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps & DeepReadonly<{}>;

const Component: VFCX<Props> = ({ className }) => (
  <div {...{ className }}>
    <svg
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      width='92px'
      height='92px'
      viewBox='0 0 24 24'
      stroke='#0004'
      strokeWidth='0.5217391304347826'
      strokeLinecap='square'
      strokeLinejoin='miter'
      fill='none'
      color='#0004'
    >
      <path d='M3 10H9V13H15V10H21' />
      <path d='M3 10L6 4H18L21 10V20H3V10Z' />
    </svg>
    <h2>条件に一致するレコードが見つかりませんでした。</h2>
  </div>
);

const StyledComponent = styled(Component)`
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #0005;
    padding: 0;
    margin: 0;
  }
  svg {
    opacity: 0.4;
    width: 200px;
    height: 200px;
  }
`;

const Container: VFC<ContainerProps> = () => {
  return <StyledComponent />;
};

export default Container;
