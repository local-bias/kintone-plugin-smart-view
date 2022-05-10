import React, { ChangeEventHandler, FC, VFCX } from 'react';
import { DeepReadonly } from 'utility-types';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { paginationIndexState } from '../../states/pagination';
import { searchTextState } from '../../states/search-text';

type Props = DeepReadonly<{
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

const Container: FC = () => {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const setPaginationIndex = useSetRecoilState(paginationIndexState);

  const onSearchTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
    setPaginationIndex(1);
  };

  return <Component {...{ searchText, onSearchTextChange }} />;
};

export default Container;
