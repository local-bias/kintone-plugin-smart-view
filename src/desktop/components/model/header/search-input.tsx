import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { ChangeEvent, ChangeEventHandler, FC, FCX, useCallback } from 'react';
import type { DeepReadonly } from 'utility-types';
import { paginationIndexAtom } from '../../../states/pagination';
import { searchTextAtom } from '../../../states/search-text';

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
  const searchText = useAtomValue(searchTextAtom);

  const onSearchTextChange = useAtomCallback(
    useCallback((get, set, e: ChangeEvent<HTMLInputElement>) => {
      set(searchTextAtom, e.target.value);
      set(paginationIndexAtom, 1);
    }, [])
  );

  return <Component {...{ searchText, onSearchTextChange }} />;
};

export default Container;
