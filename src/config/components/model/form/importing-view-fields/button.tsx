import { t } from '@/lib/i18n';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';
import { useSetAtom } from 'jotai';
import { FC } from 'react';
import { listViewDialogShownAtom } from '../../../../states/importing-view-fields';

const ViewFieldsImportButton: FC = () => {
  const setListViewDialogShown = useSetAtom(listViewDialogShownAtom);

  const onClick = () => {
    setListViewDialogShown(true);
  };

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={onClick}
      startIcon={<ContentCopyIcon />}
      sx={{ textTransform: 'lowercase' }}
    >
      {t('config.app.form.importViewFieldsButton.label')}
    </Button>
  );
};

export default ViewFieldsImportButton;
