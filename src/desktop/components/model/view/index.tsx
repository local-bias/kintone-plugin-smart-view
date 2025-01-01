import { errorAtom, viewTypeAtom } from '@/desktop/states/plugin';
import { isOriginalTableShownAtom } from '@/desktop/states/records';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import TableView from '../table';
import CardView from '../view-card';
import EmptyStateView from './empty';
import ErrorNofitication from './error';

const Component: FC = () => {
  const viewType = useAtomValue(viewTypeAtom);
  const error = useAtomValue(errorAtom);
  const isOriginalTableShown = useAtomValue(isOriginalTableShownAtom);

  if (error) {
    return <ErrorNofitication />;
  }
  if (!isOriginalTableShown) {
    return <EmptyStateView />;
  }
  if (viewType === 'card') {
    return <CardView />;
  }
  return <TableView />;
};

export default Component;
