import {
  exportPluginConfigAtom,
  importPluginConfigAtom,
  updatePluginConfigAtom,
} from '@/config/states/plugin-config';
import {
  PluginConfigExportButton,
  PluginConfigImportButton,
  PluginFooter,
} from '@konomi-app/kintone-utilities-react';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { FC, useCallback } from 'react';
import { loadingAtom } from '../../../states/plugin';
import ResetButton from './reset-button';

const Container: FC = () => {
  const onBackButtonClick = useCallback(() => history.back(), []);
  const onSaveButtonClick = useSetAtom(updatePluginConfigAtom);
  const loading = useAtomValue(loadingAtom);
  const exportConfig = useSetAtom(exportPluginConfigAtom);
  const importConfig = useSetAtom(importPluginConfigAtom);

  return (
    <PluginFooter className='[&_button]:m-2'>
      <div>
        <Button
          variant='contained'
          color='primary'
          disabled={loading}
          onClick={onSaveButtonClick}
          startIcon={loading ? <CircularProgress color='inherit' size={20} /> : <SaveIcon />}
        >
          設定を保存
        </Button>
        <Button
          variant='contained'
          color='inherit'
          disabled={loading}
          onClick={onBackButtonClick}
          startIcon={
            loading ? <CircularProgress color='inherit' size={20} /> : <SettingsBackupRestoreIcon />
          }
        >
          プラグイン一覧へ戻る
        </Button>
      </div>
      <div>
        <PluginConfigExportButton onExportButtonClick={exportConfig} loading={loading} />
        <PluginConfigImportButton onImportButtonClick={importConfig} loading={loading} />
        <ResetButton />
      </div>
    </PluginFooter>
  );
};

export default Container;
