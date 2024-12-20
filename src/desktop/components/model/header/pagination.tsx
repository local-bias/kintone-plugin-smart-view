import styled from '@emotion/styled';
import { isMobile } from '@konomi-app/kintone-utilities';
import { Pagination } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { FC, FCX } from 'react';
import { SetterOrUpdater } from 'recoil';
import { paginationChunkAtom, paginationIndexAtom } from '../../../states/pagination';
import { filteredTableRowsAtom } from '../../../states/records';

type Props = {
  size: number;
  index: number;
  setIndex: SetterOrUpdater<number>;
  chunkSize: number;
};

const Component: FCX<Props> = ({ className, size, index, setIndex, chunkSize }) => (
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
  const records = useAtomValue(filteredTableRowsAtom);
  const [index, setIndex] = useAtom(paginationIndexAtom);
  const chunkSize = useAtomValue(paginationChunkAtom);

  const size = records.length || 0;

  return <>{!!size && <StyledComponent {...{ size, index, setIndex, chunkSize }} />}</>;
};

export default Container;
