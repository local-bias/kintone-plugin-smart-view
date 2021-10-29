import React, { VFC } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import { Pagination } from '@mui/material';
import { filteredRecordsState } from '../../states/filtered-records';
import { paginationIndexState } from '../../states/pagination-index';
import { paginationChunkState } from '../../states/pagination-chunk';

type Props = {
  size: number;
  index: number;
  setIndex: SetterOrUpdater<number>;
  chunkSize: number;
};

const Component: VFC<Props> = ({ size, index, setIndex, chunkSize }) => (
  <Pagination
    className='ribbit-pagination'
    count={Math.ceil(size / chunkSize)}
    page={index}
    color='primary'
    onChange={(_, index) => setIndex(index)}
  />
);

const Container: VFC = () => {
  const records = useRecoilValue(filteredRecordsState);
  const [index, setIndex] = useRecoilState(paginationIndexState);
  const chunkSize = useRecoilValue(paginationChunkState);

  const size = records.length || 0;

  return <>{!!size && <Component {...{ size, index, setIndex, chunkSize }} />}</>;
};

export default Container;
