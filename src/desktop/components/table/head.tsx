import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { HeaderCell, headerCellsState } from '../../states/header-cells';
import { SORTABLE_FIELDS } from '../../static';
import { Sorting, sortingState } from '../../states/sorting';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { pluginConditionState } from '../../states/plugin-condition';
import { paginationIndexState } from '../../states/pagination';

type Props = DeepReadonly<{
  sortable: boolean;
  cells: HeaderCell[];
  sorting: Sorting;
  onCellClick: (cell: DeepReadonly<HeaderCell>) => void;
}>;

const Component: FC<Props> = ({ cells, sorting, onCellClick, sortable }) => (
  <thead>
    <tr>
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
          <div>
            {label}
            {sorting.field !== property?.code ? (
              ''
            ) : sorting.order === 'desc' ? (
              <ArrowDropDownIcon color='primary' />
            ) : (
              <ArrowDropUpIcon color='primary' />
            )}
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

const Container: FC = () => {
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

  const sortable = !!condition?.sortable;

  return <Component {...{ cells, sorting, onCellClick, sortable }} />;
};

export default Container;
