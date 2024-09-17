import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { MyTable } from './layout';
import Head from './head';
import Body from './body';
import { pluginConditionState } from '../../../states/plugin';

const Table: FC = () => {
  const condition = useRecoilValue(pluginConditionState);

  return (
    <MyTable condition={condition}>
      <Head />
      <Body />
    </MyTable>
  );
};
Table.displayName = 'OriginalTable';

export default Table;
