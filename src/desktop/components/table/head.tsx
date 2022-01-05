import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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

const Component: VFC<Props> = ({ cells, sorting, onCellClick, sortable }) => (
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

const Container: VFC = () => {
  const cells = useRecoilValue(headerCellsState);
  const [sorting, setSorting] = useRecoilState(sortingState);
  const condition = useRecoilValue(pluginConditionState);
  const setPaginationIndex = useSetRecoilState(paginationIndexState);

  const sortable = !!condition?.sortable;

  const onCellClick = (cell: DeepReadonly<HeaderCell>) => {
    const { label, property } = cell;

    setPaginationIndex(1);
    setSorting((_sorting) => {
      const fieldCode = property?.code || label;

      const order =
        _sorting.field === fieldCode ? (_sorting.order === 'desc' ? 'asc' : 'desc') : 'desc';

      return { field: fieldCode, order };
    });
  };

  return <Component {...{ cells, sorting, onCellClick, sortable }} />;
};

export default Container;
