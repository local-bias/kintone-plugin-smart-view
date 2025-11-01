import { isFieldSettingsDialogOpenAtom } from '@/desktop/states/visible-fields';
import { pluginConditionAtom } from '@/desktop/states/plugin';
import { Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSetAtom, useAtomValue } from 'jotai';
import { FC } from 'react';

const FieldSettingsButton: FC = () => {
  const condition = useAtomValue(pluginConditionAtom);
  const setDialogOpen = useSetAtom(isFieldSettingsDialogOpenAtom);

  if (!condition?.isViewFieldsControlEnabled) {
    return null;
  }

  return (
    <Button
      variant='outlined'
      color='primary'
      size='small'
      startIcon={<SettingsIcon />}
      onClick={() => setDialogOpen(true)}
    >
      表示フィールド設定
    </Button>
  );
};

export default FieldSettingsButton;
