import React, { FCX } from 'react';
import styled from '@emotion/styled';
import { default as Button, ButtonProps } from '@mui/material/Button';

type Props = ButtonProps;

const Component: FCX<Props> = (props) => <Button variant='contained' {...props} />;

const StyledComponent = styled(Component)`
  background-color: #f7f9fa !important;
  color: #3498db !important;
  &:hover {
    background-color: #c8d6dd !important;
  }
`;

export const ColoredButton = StyledComponent;
