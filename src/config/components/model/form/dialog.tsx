import {
  selectedConditionAtom,
  selectedViewFieldDetailSettingIndexAtom,
} from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback, type FC } from 'react';

const Component: FC = () => {
  const selectedIndex = useAtomValue(selectedViewFieldDetailSettingIndexAtom);
  const condition = useAtomValue(selectedConditionAtom);
  const open = selectedIndex !== null;
  const viewField = selectedIndex !== null ? condition.viewFields[selectedIndex] : null;
  const index = selectedIndex ?? 0;

  const onClose = useAtomCallback(
    useCallback((_, set) => {
      set(selectedViewFieldDetailSettingIndexAtom, null);
    }, [])
  );

  const onEditableChange = useAtomCallback(
    useCallback((_, set, index: number, value: boolean) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].isEditable = value;
        })
      );
    }, [])
  );

  const onDisplayNameChange = useAtomCallback(
    useCallback((_, set, index: number, value: string) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].displayName = value || null;
        })
      );
    }, [])
  );

  const onNowrapChange = useAtomCallback(
    useCallback((_, set, index: number, value: boolean) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].nowrap = value;
        })
      );
    }, [])
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('config.app.form.view-fields.detailSetting.title', viewField?.fieldCode ?? '')}
      </DialogTitle>
      <DialogContent>
        <PluginFormSection>
          <PluginFormTitle>{t('config.app.form.view-fields.isEditable.title')}</PluginFormTitle>
          <PluginFormDescription last>
            {t('config.app.form.view-fields.isEditable.description')}
          </PluginFormDescription>
          <FormControlLabel
            control={
              <Switch
                checked={viewField?.isEditable ?? false}
                onChange={(_, checked) => onEditableChange(index, checked)}
              />
            }
            label={t('config.app.form.view-fields.isEditable.label')}
          />
        </PluginFormSection>
        <PluginFormSection>
          <PluginFormTitle>{t('config.app.form.view-fields.displayName.title')}</PluginFormTitle>
          <PluginFormDescription last>
            {t('config.app.form.view-fields.displayName.description')}
          </PluginFormDescription>
          <TextField
            label={t('config.app.form.view-fields.displayName.label')}
            value={viewField?.displayName ?? ''}
            onChange={(e) => onDisplayNameChange(index, e.target.value)}
          />
        </PluginFormSection>
        <PluginFormSection>
          <PluginFormTitle>{t('config.app.form.view-fields.nowrap.title')}</PluginFormTitle>
          <PluginFormDescription last>
            {t('config.app.form.view-fields.nowrap.description')}
          </PluginFormDescription>
          <FormControlLabel
            control={
              <Switch
                checked={viewField?.nowrap ?? false}
                onChange={(_, checked) => onNowrapChange(index, checked)}
              />
            }
            label={t('config.app.form.view-fields.nowrap.label')}
          />
        </PluginFormSection>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Component;
