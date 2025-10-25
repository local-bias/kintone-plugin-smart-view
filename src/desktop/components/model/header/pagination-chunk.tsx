import { MenuItem, TextField } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { ChangeEvent, FC } from 'react';
import { paginationChunkAtom } from '../../../states/pagination';
import { pluginConditionAtom } from '../../../states/plugin';

const handleChunkChangeAtom = atom(null, (_, set, event: ChangeEvent<HTMLInputElement>) => {
  set(paginationChunkAtom, Number(event.target.value));
});

const Component: FC = () => {
  const paginationChunk = useAtomValue(paginationChunkAtom);
  const onChunkChange = useSetAtom(handleChunkChangeAtom);

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
