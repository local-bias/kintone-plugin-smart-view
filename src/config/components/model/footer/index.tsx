import { GUEST_SPACE_ID } from '@/lib/global';
import { VIEW_ROOT_ID } from '@/lib/statics';
import { getAppId, getViews, storeStorage, updateViews } from '@konomi-app/kintone-utilities';
import { PluginFooter } from '@konomi-app/kintone-utilities-react';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Button, CircularProgress } from '@mui/material';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';
import { loadingAtom, loadingCountAtom, pluginConfigAtom } from '../../../states/plugin';
import ExportButton from './export-button';
import ImportButton from './import-button';
import ResetButton from './reset-button';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: FC<Props> = ({ onSaveButtonClick, onBackButtonClick }) => {
  const loading = useAtomValue(loadingAtom);

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
        <ExportButton />
        <ImportButton />
        <ResetButton />
      </div>
    </PluginFooter>
  );
};

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = useCallback(() => history.back(), []);

  const onSaveButtonClick = useAtomCallback(
    useCallback(async (get, set) => {
      try {
        set(loadingCountAtom, (c) => c + 1);
        const storage = await get(pluginConfigAtom);

        const app = getAppId();
        if (!app) {
          throw new Error('アプリのフィールド情報が取得できませんでした');
        }
        const { views } = await getViews({
          app,
          preview: true,
          guestSpaceId: GUEST_SPACE_ID,
          debug: process.env.NODE_ENV === 'development',
        });

        const newViews = produce(views, (draft) => {
          for (const condition of storage?.conditions || []) {
            for (const view of Object.values(draft)) {
              if (view.id === condition.viewId && view.type === 'CUSTOM') {
                view.html = `<div id='${VIEW_ROOT_ID}'></div>`;
                view.pager = false;
              }
            }
          }
        });

        let warning: string = '';
        try {
          await updateViews({
            app,
            views: newViews,
            guestSpaceId: GUEST_SPACE_ID,
            debug: process.env.NODE_ENV === 'development',
          });
        } catch (error: any) {
          console.error(error);
          if (error?.code === 'CB_NO02') {
            warning =
              '設定を更新しましたが、システム管理権限がないため、一覧の更新がスキップされました。';
          }
        }

        storeStorage(storage!, () => true);
        if (warning) {
          enqueueSnackbar(warning, {
            variant: 'warning',
            action: (
              <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                プラグイン一覧に戻る
              </Button>
            ),
          });
        } else {
          enqueueSnackbar('設定を保存しました', {
            variant: 'success',
            action: (
              <Button color='inherit' size='small' variant='outlined' onClick={onBackButtonClick}>
                プラグイン一覧に戻る
              </Button>
            ),
          });
        }
      } finally {
        set(loadingCountAtom, (c) => c - 1);
      }
    }, [])
  );

  return <Component {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
