import { errorAtom, viewTypeAtom } from '@/desktop/states/plugin';
import { isOriginalTableShownAtom } from '@/desktop/states/records';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import TableView from '../table';
import CardView from '../view-card';
import Empty from './empty';
import ErrorNofitication from './error';

const Component: FC = () => {
  const viewType = useAtomValue(viewTypeAtom);
  const error = useAtomValue(errorAtom);
  const isOriginalTableShown = useAtomValue(isOriginalTableShownAtom);

  if (error) {
    return <ErrorNofitication />;
  }
  if (!isOriginalTableShown) {
    return <Empty />;
  }
  if (viewType === 'card') {
    return <CardView />;
  }
  return <TableView />;
};

export default Component;
