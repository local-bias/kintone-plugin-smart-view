import React, { VFC, VFCX } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Pagination } from '@material-ui/lab';
import { filterdRecordsState } from '../../states/filterd-records';
import { paginationIndexState } from '../../states/pagination-index';
import { paginationChunkState } from '../../states/pagination-chunk';

type Props = {
  size: number;
  index: number;
  setIndex: SetterOrUpdater<number>;
  chunkSize: number;
};

const Component: VFCX<Props> = ({ className, size, index, setIndex, chunkSize }) => (
  <div {...{ className }}>
    <Pagination
      count={Math.ceil(size / chunkSize)}
      page={index}
      color='primary'
      onChange={(_, index) => setIndex(index)}
    />
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC = () => {
  const records = useRecoilValue(filterdRecordsState);
  const [index, setIndex] = useRecoilState(paginationIndexState);
  const chunkSize = useRecoilValue(paginationChunkState);

  const size = records.length || 0;

  return <>{!!size && <StyledComponent {...{ size, index, setIndex, chunkSize }} />}</>;
};

export default Container;
