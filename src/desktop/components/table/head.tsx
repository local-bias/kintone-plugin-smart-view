import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { useRecoilValue } from 'recoil';
import { headerCellsState } from '../../states/header-cells';

type Props = DeepReadonly<{ cells: string[] }>;

const Component: VFC<Props> = ({ cells }) => (
  <thead>
    <tr>
      <th></th>
      {cells.map((cell, i) => (
        <th key={i}>{cell}</th>
      ))}
    </tr>
  </thead>
);

const Container: VFC = () => {
  const cells = useRecoilValue(headerCellsState);

  return <Component {...{ cells }} />;
};

export default Container;
