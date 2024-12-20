import { MenuItem, TextField } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { ChangeEventHandler, FC, useCallback } from 'react';
import { paginationChunkAtom } from '../../../states/pagination';
import { pluginConditionAtom } from '../../../states/plugin';

const Component: FC = () => {
  const paginationChunk = useAtomValue(paginationChunkAtom);

  const onChunkChange: ChangeEventHandler<HTMLInputElement> = useAtomCallback(
    useCallback((get, set, props) => {
      set(paginationChunkAtom, Number(props.target.value));
    }, [])
  );

  return (
    <div>
      <TextField
        label='表示件数'
        select
        variant='outlined'
        color='primary'
        size='small'
        value={paginationChunk}
        onChange={onChunkChange}
        sx={{ minWidth: '80px' }}
      >
        {[20, 40, 60, 80, 100].map((chunk) => (
          <MenuItem key={chunk} value={chunk}>
            {chunk}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const Container: FC = () => {
  const condition = useAtomValue(pluginConditionAtom);

  if (!condition?.isPaginationChunkControlShown) {
    return null;
  }
  return <Component />;
};

export default Container;
