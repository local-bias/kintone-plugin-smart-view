import React, { FC, VFCX } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Pagination } from '@mui/material';
import { filteredRecordsState } from '../../states/records';
import { paginationIndexState, paginationChunkState } from '../../states/pagination';
import { isMobile } from '@common/kintone';

type Props = {
  size: number;
  index: number;
  setIndex: SetterOrUpdater<number>;
  chunkSize: number;
};

const Component: VFCX<Props> = ({ className, size, index, setIndex, chunkSize }) => (
  <div {...{ className }}>
    {!isMobile() && (
      <div className='location'>
        {(index - 1) * chunkSize + 1} - {index * chunkSize > size ? size : index * chunkSize}（
        {size}
        件中）
      </div>
    )}
    <Pagination
      className='ribbit-pagination'
      count={Math.ceil(size / chunkSize)}
      page={index}
      color='primary'
      onChange={(_, index) => setIndex(index)}
    />
  </div>
);

const StyledComponent = styled(Component)`
  display: flex;
  align-items: center;

  .location {
    font-size: 14px;
  }
`;

const Container: FC = () => {
  const records = useRecoilValue(filteredRecordsState);
  const [index, setIndex] = useRecoilState(paginationIndexState);
  const chunkSize = useRecoilValue(paginationChunkState);

  const size = records.length || 0;

  return <>{!!size && <StyledComponent {...{ size, index, setIndex, chunkSize }} />}</>;
};

export default Container;
