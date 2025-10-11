import { t } from '@/lib/i18n';
import { createConfig } from '@/lib/plugin';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useState } from 'react';
import { pluginConfigAtom } from '../../../states/plugin';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);

  const onIconButtonClick = useCallback(() => {
    setOpen(true);
  }, []);

  const onDecisionButtonClick = useAtomCallback(
    useCallback((get, set) => {
      set(pluginConfigAtom, createConfig());
      setOpen(false);
      enqueueSnackbar(t('common.config.resetSuccess'), { variant: 'success' });
    }, [])
  );

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{t('common.config.resetDialog.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('common.config.resetDialog.message')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained' onClick={onDecisionButtonClick}>
            {t('common.config.resetDialog.execute')}
          </Button>
          <Button color='inherit' variant='contained' onClick={onClose}>
            {t('common.config.resetDialog.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title={t('common.config.resetButton.tooltip')}>
        <IconButton onClick={onIconButtonClick}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

// React 19: Component will be automatically optimized by React Compiler
export default Component;
