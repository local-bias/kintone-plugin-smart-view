import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { headerCellsState } from '../../../states/header-cells';
import { errorState, pluginConditionState } from '../../../states/plugin';
import { Skeleton } from '@mui/material';
import { MyTableHead } from './layout';

const Component: FC = () => {
  const cells = useRecoilValue(headerCellsState);

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
  const condition = useRecoilValue(pluginConditionState);

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
  const error = useRecoilValue(errorState);

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
