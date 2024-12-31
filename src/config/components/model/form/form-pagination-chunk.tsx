import { t } from '@/lib/i18n';
import { MenuItem, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { ChangeEventHandler, FC } from 'react';
import { paginationChunkAtom } from '../../../states/plugin';

const PaginationChunkForm: FC = () => {
  const [paginationChunk, setPaginationChunk] = useAtom(paginationChunkAtom);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPaginationChunk(Number(e.target.value));
  };

  return (
    <div style={{ marginTop: '.75rem' }}>
      <TextField
        label={t('config.app.form.paginationChunk.label')}
        select
        variant='outlined'
        color='primary'
        value={paginationChunk}
        onChange={onChange}
        sx={{ width: '170px' }}
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

export default PaginationChunkForm;
