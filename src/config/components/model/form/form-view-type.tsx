import { getConditionPropertyAtom } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { MenuItem, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { ChangeEventHandler, FC } from 'react';

const VIEW_TYPES = [
  { value: 'table', label: t('config.app.form.view-type.table') },
  { value: 'card', label: t('config.app.form.view-type.card') },
] satisfies { value: Plugin.ViewType; label: string }[];

const state = getConditionPropertyAtom('viewType');

const ViewTypeForm: FC = () => {
  const [viewType, setViewType] = useAtom(state);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setViewType(e.target.value as Plugin.ViewType);
  };

  return (
    <div style={{ marginTop: '.75rem' }}>
      <TextField
        label={t('config.app.form.view-type.label')}
        select
        variant='outlined'
        color='primary'
        value={viewType}
        onChange={onChange}
        sx={{ width: '170px' }}
      >
        {VIEW_TYPES.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default ViewTypeForm;
