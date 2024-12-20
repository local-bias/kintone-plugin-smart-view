import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';
import { headerCellsAtom } from '../../../states/header-cells';
import { errorAtom, pluginConditionAtom } from '../../../states/plugin';
import { MyTableHead } from './layout';

const Component: FC = () => {
  const cells = useAtomValue(headerCellsAtom);

  return (
    <>
      <th></th>
      {cells.map(({ label }, i) => (
        <th key={i}>{label}</th>
      ))}
    </>
  );
};

const PlaceHolder: FC = () => {
  const condition = useAtomValue(pluginConditionAtom);

  let colCount = condition?.viewFields.length ?? 6;

  return (
    <>
      <th></th>
      {new Array(colCount).fill('').map((_, i) => (
        <th key={i}>
          <Skeleton variant='text' />
        </th>
      ))}
    </>
  );
};

const Container: FC = () => {
  const error = useAtomValue(errorAtom);

  if (error) {
    return null;
  }

  return (
    <MyTableHead sticky={48}>
      <tr>
        <Suspense fallback={<PlaceHolder />}>
          <Component />
        </Suspense>
      </tr>
    </MyTableHead>
  );
};

export default Container;
