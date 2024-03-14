import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { isOriginalTableShownState } from '../../../states/records';

import { MyTable } from './layout';
import Head from './head';
import Body from './body';
import Empty from './empty';
import ErrorNofitication from './error';
import { errorState, pluginConditionState } from '../../../states/plugin';

const Table: FC = () => {
  const condition = useRecoilValue(pluginConditionState);

  return (
    <MyTable columns={condition?.viewFields.map(({ width }) => ({ width })) ?? []}>
      <Head />
      <Body />
    </MyTable>
  );
};
Table.displayName = 'OriginalTable';

const Container: FC = () => {
  const error = useRecoilValue(errorState);
  const isOriginalTableShown = useRecoilValue(isOriginalTableShownState);

  if (error) {
    return <ErrorNofitication />;
  }
  if (!isOriginalTableShown) {
    return <Empty />;
  }
  return <Table />;
};
Container.displayName = 'TableContainer';

export default Container;
