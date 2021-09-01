import React, { FCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps & DeepReadonly<{}>;

const Component: FCX<Props> = ({ className, children }) => <div {...{ className }}>{children}</div>;

const StyledComponent = styled(Component)``;

export default StyledComponent;
