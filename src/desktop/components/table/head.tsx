import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { pluginConditionState } from '../../states/plugin-condition';
import { useRecoilValue } from 'recoil';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps & DeepReadonly<{ condition: kintone.plugin.Condition }>;

const Component: VFCX<Props> = ({ className, condition }) => (
  <thead>
    <tr>
      <th></th>
      {condition.viewDisplayingFields.map((field, i) => (
        <th key={i}>{field}</th>
      ))}
    </tr>
  </thead>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  const condition = useRecoilValue(pluginConditionState)!;

  return <StyledComponent {...{ condition }} />;
};

export default Container;
