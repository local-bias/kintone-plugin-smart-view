import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { InputAdornment, TextField } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchTextState } from '../../states/search-text';
import SearchIcon from '@material-ui/icons/Search';

import Layout from './layout';
import Pagination from './pagination';
import { paginationIndexState } from '../../states/pagination-index';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps &
  DeepReadonly<{
    searchText: string;
    onSearchTextChange: ChangeEventHandler<HTMLInputElement>;
  }>;

const Component: VFCX<Props> = ({ className, searchText, onSearchTextChange }) => (
  <div {...{ className }}>
    <Layout>
      <TextField
        variant='outlined'
        color='primary'
        label='フィールドを検索'
        value={searchText}
        onChange={onSearchTextChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Pagination />
    </Layout>
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setPaginationIndex = useSetRecoilState(paginationIndexState);

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
    setPaginationIndex(1);
  };

  return <StyledComponent {...{ searchText, onSearchTextChange }} />;
};

export default Container;
