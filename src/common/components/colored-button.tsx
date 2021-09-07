import React, { VFCX } from 'react';
import styled from '@emotion/styled';
import { default as Button, ButtonProps } from '@material-ui/core/Button';

type Props = ButtonProps;

const Component: VFCX<Props> = (props) => <Button variant='contained' {...props} />;

const StyledComponent = styled(Component)`
  background-color: #f7f9fa !important;
  color: #3498db !important;
  &:hover {
    background-color: #c8d6dd !important;
  }
`;

export const ColoredButton = StyledComponent;
