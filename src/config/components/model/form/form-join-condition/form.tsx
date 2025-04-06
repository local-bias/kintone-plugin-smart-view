import { cn } from '@/lib/utils';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, TextField, Tooltip } from '@mui/material';
import { GripVertical, Link2Icon } from 'lucide-react';
import { FC } from 'react';

const Container: FC = () => {
  return (
    <div className='space-y-4'>
      <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
        <div className={cn('flex items-center gap-4')}>
          <div className='grid place-items-center p-4 outline-none grab' tabIndex={-1}>
            <GripVertical className='w-5 h-5 text-gray-400' />
          </div>
          <div className=''>
            <div className='flex items-center gap-2'>
              <TextField
                label='このアプリのキーフィールド'
                variant='outlined'
                color='primary'
                sx={{ width: '350px' }}
                disabled
              />
              <Link2Icon />
              <div className='space-y-4'>
                <div>
                  <TextField
                    label='結合するアプリ'
                    variant='outlined'
                    color='primary'
                    sx={{ width: '350px' }}
                    disabled
                  />
                </div>
                <TextField
                  label='結合するアプリのキーフィールド'
                  variant='outlined'
                  color='primary'
                  sx={{ width: '350px' }}
                  disabled
                />
              </div>
            </div>
          </div>
          <Tooltip title='表示フィールドを追加する'>
            <IconButton size='small' disabled>
              <AddIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </div>
      </Tooltip>
    </div>
  );
};

export default Container;
