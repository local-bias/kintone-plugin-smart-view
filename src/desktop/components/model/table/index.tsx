import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { pluginConditionAtom, resolvedTableColumnsAtom } from '../../../states/plugin';
import Body from './body';
import Head from './head';
import { MyTable } from './layout';

const Table: FC = () => {
  const condition = useAtomValue(pluginConditionAtom);
  const viewFields = useAtomValue(resolvedTableColumnsAtom);

  return (
    <MyTable condition={condition} viewFields={viewFields}>
      <Head />
      <Body />
    </MyTable>
  );
};
Table.displayName = 'OriginalTable';

export default Table;
