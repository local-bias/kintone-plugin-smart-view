import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { pluginConditionAtom } from '../../../states/plugin';
import Body from './body';
import Head from './head';
import { MyTable } from './layout';

const Table: FC = () => {
  const condition = useAtomValue(pluginConditionAtom);

  return (
    <MyTable condition={condition}>
      <Head />
      <Body />
    </MyTable>
  );
};
Table.displayName = 'OriginalTable';

export default Table;
