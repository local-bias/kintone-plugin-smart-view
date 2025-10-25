import { errorAtom, viewTypeAtom } from '@/desktop/states/plugin';
import { isOriginalTableShownAtom } from '@/desktop/states/records';
import { useAtomValue } from 'jotai';
import { FC, PropsWithChildren } from 'react';
import TableView from '../table';
import CardView from '../view-card';
import EmptyStateView from './empty';
import ErrorNofitication from './error';

const ErrorGuard: FC<PropsWithChildren> = ({ children }) => {
  const error = useAtomValue(errorAtom);
  if (error) {
    return <ErrorNofitication />;
  }
  return children;
};

const EmptyGuard: FC<PropsWithChildren> = ({ children }) => {
  const isOriginalTableShown = useAtomValue(isOriginalTableShownAtom);
  if (!isOriginalTableShown) {
    return <EmptyStateView />;
  }
  return children;
};

const ViewTypeSwitcher: FC = () => {
  const viewType = useAtomValue(viewTypeAtom);
  if (viewType === 'card') {
    return <CardView />;
  }
  return <TableView />;
};

const View: FC = () => {
  return (
    <ErrorGuard>
      <EmptyGuard>
        <ViewTypeSwitcher />
      </EmptyGuard>
    </ErrorGuard>
  );
};

export default View;
