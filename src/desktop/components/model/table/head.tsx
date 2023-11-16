import React, { FC, Suspense } from 'react';
import type { DeepReadonly } from 'utility-types';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { HeaderCell, headerCellsState } from '../../../states/header-cells';
import { SORTABLE_FIELDS } from '../../../static';
import { Sorting, sortingState } from '../../../states/sorting';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { errorState, pluginConditionState } from '../../../states/plugin';
import { paginationIndexState } from '../../../states/pagination';
import { Skeleton } from '@mui/material';
import { MyTableHead } from './layout';

const Component: FC = () => {
  const cells = useRecoilValue(headerCellsState);
  const sorting = useRecoilValue(sortingState);
  const condition = useRecoilValue(pluginConditionState);

  const onCellClick = useRecoilCallback(
    ({ set, reset }) =>
      (cell: DeepReadonly<HeaderCell>) => {
        const { label, property } = cell;

        reset(paginationIndexState);
        set(sortingState, (_sorting) => {
          const fieldCode = property?.code || label;

          const order = (
            _sorting.field === fieldCode ? (_sorting.order === 'desc' ? 'asc' : 'desc') : 'desc'
          ) as Sorting['order'];

          return { field: fieldCode, order };
        });
      },
    []
  );

  const sortable = !!condition?.isSortable;

  return (
    <>
      <th></th>
      {cells.map(({ label, property }, i) => (
        <th
          key={i}
          className={
            sortable && property && SORTABLE_FIELDS.includes(property.type) ? 'sortable' : ''
          }
          onClick={
            sortable && property && SORTABLE_FIELDS.includes(property.type)
              ? () => onCellClick({ label, property })
              : () => null
          }
        >
          <>
            {label}
            {sorting.field !== property?.code ? (
              ''
            ) : sorting.order === 'desc' ? (
              <ArrowDropDownIcon color='primary' />
            ) : (
              <ArrowDropUpIcon color='primary' />
            )}
          </>
        </th>
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
