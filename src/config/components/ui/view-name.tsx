import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, memo, Suspense } from 'react';
import { customViewsAtom } from '../../states/kintone';
import { viewIdAtom } from '../../states/plugin';

const Component: FC = () => {
  const views = useAtomValue(customViewsAtom);
  const viewId = useAtomValue(viewIdAtom);

  const found = Object.values(views).find((view) => view.id === viewId);

  if (!found) {
    return null;
  }

  return <> ({found.name})</>;
};

const Container: FC = () => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component />
    </Suspense>
  );
};

export default memo(Container);
