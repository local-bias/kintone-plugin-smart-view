import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import { DeepReadonly } from 'utility-types';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { paginationIndexState } from '../../states/pagination-index';
import { searchTextState } from '../../states/search-text';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps &
  DeepReadonly<{
    searchText: string;
    onSearchTextChange: ChangeEventHandler<HTMLInputElement>;
  }>;

const Component: VFCX<Props> = ({ searchText, onSearchTextChange }) => (
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
);

const Container: VFC<ContainerProps> = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setPaginationIndex = useSetRecoilState(paginationIndexState);

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
    setPaginationIndex(1);
  };

  return <Component {...{ searchText, onSearchTextChange }} />;
};

export default Container;