import styled from '@emotion/styled';
import { isMobile } from '@konomi-app/kintone-utilities';
import { Pagination } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { FC } from 'react';
import {
  handlePaginationIndexChangeAtom,
  paginationChunkAtom,
  paginationIndexAtom,
} from '../../../states/pagination';
import { tableRowLengthAtom } from '../../../states/records';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;

  .location {
    font-size: 14px;
  }
`;

const isPaginationShownAtom = atom((get) => {
  const size = get(tableRowLengthAtom);
  return size > 0;
});

const paginationCountAtom = atom((get) => {
  const size = get(tableRowLengthAtom);
  const chunkSize = get(paginationChunkAtom);
  return Math.ceil(size / chunkSize);
});

const HeaderPagination: FC = () => {
  const index = useAtomValue(paginationIndexAtom);
  const count = useAtomValue(paginationCountAtom);
  const onChange = useSetAtom(handlePaginationIndexChangeAtom);
  return (
    <Pagination
      className='ribbit-pagination'
      count={count}
      page={index}
      color='primary'
      onChange={onChange}
    />
  );
};

const PaginationDisplayText: FC = () => {
  const size = useAtomValue(tableRowLengthAtom);
  const index = useAtomValue(paginationIndexAtom);
  const chunkSize = useAtomValue(paginationChunkAtom);

  if (isMobile() || size === 0) {
    return null;
  }

  return (
    <div className='location'>
      {(index - 1) * chunkSize + 1} - {index * chunkSize > size ? size : index * chunkSize}（{size}
      件中）
    </div>
  );
};

const Container: FC = () => {
  const isShown = useAtomValue(isPaginationShownAtom);

  if (!isShown) {
    return null;
  }

  return (
    <PaginationContainer>
      <PaginationDisplayText />
      <HeaderPagination />
    </PaginationContainer>
  );
};

export default Container;
