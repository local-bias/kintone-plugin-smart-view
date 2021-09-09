import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { pluginConditionState } from '../../states/plugin-condition';
import { useRecoilValue } from 'recoil';

type Props = DeepReadonly<{ condition: kintone.plugin.Condition }>;

const Component: VFC<Props> = ({ condition }) => (
  <thead>
    <tr>
      <th></th>
      {condition.viewDisplayingFields.map((field, i) => (
        <th key={i}>{field}</th>
      ))}
    </tr>
  </thead>
);

const Container: VFC = () => {
  const condition = useRecoilValue(pluginConditionState)!;

  return <Component {...{ condition }} />;
};

export default Container;
