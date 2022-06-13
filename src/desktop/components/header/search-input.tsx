import React, { ChangeEvent, ChangeEventHandler, FC, FCX } from 'react';
import { DeepReadonly } from 'utility-types';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { paginationIndexState } from '../../states/pagination';
import { searchTextState } from '../../states/search-text';

type Props = DeepReadonly<{
  searchText: string;
  onSearchTextChange: ChangeEventHandler<HTMLInputElement>;
}>;

const Component: FCX<Props> = ({ searchText, onSearchTextChange }) => (
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

const Container: FC = () => {
  const searchText = useRecoilValue(searchTextState);

  const onSearchTextChange = useRecoilCallback(
    ({ set, reset }) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        set(searchTextState, e.target.value);
        reset(paginationIndexState);
      },
    []
  );

  return <Component {...{ searchText, onSearchTextChange }} />;
};

export default Container;
