import {
  selectedConditionState,
  selectedViewFieldDetailSettingIndexState,
} from '@/config/states/plugin';
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
import React, { type FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

const Component: FC = () => {
  const selectedIndex = useRecoilValue(selectedViewFieldDetailSettingIndexState);
  const condition = useRecoilValue(selectedConditionState);
  const open = selectedIndex !== null;
  const viewField = selectedIndex !== null ? condition.viewFields[selectedIndex] : null;
  const index = selectedIndex ?? 0;

  const onClose = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(selectedViewFieldDetailSettingIndexState);
      },
    []
  );

  const onEditableChange = useRecoilCallback(
    ({ set }) =>
      (index: number, value: boolean) => {
        set(selectedConditionState, (prev) =>
          produce(prev, (draft) => {
            draft.viewFields[index].isEditable = value;
          })
        );
      },
    []
  );

  const onDisplayNameChange = useRecoilCallback(
    ({ set }) =>
      (index: number, value: string) => {
        set(selectedConditionState, (prev) =>
          produce(prev, (draft) => {
            draft.viewFields[index].displayName = value || null;
          })
        );
      },
    []
  );

  const onNowrapChange = useRecoilCallback(
    ({ set }) =>
      (index: number, value: boolean) => {
        set(selectedConditionState, (prev) =>
          produce(prev, (draft) => {
            draft.viewFields[index].nowrap = value;
          })
        );
      },
    []
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{viewField?.fieldCode}の詳細設定</DialogTitle>
      <DialogContent>
        <PluginFormSection>
          <PluginFormTitle>編集画面での表示</PluginFormTitle>
          <PluginFormDescription last>
            スイッチをオフにした場合、編集画面には表示されません。
          </PluginFormDescription>
          <FormControlLabel
            control={
              <Switch
                checked={viewField?.isEditable ?? false}
                onChange={(_, checked) => onEditableChange(index, checked)}
              />
            }
            label='編集画面に表示'
          />
        </PluginFormSection>
        <PluginFormSection>
          <PluginFormTitle>表示名</PluginFormTitle>
          <PluginFormDescription last>
            値を設定した場合、標準のフィールド名ではなく、こちらの値が表示されます。
          </PluginFormDescription>
          <TextField
            label='表示名'
            value={viewField?.displayName ?? ''}
            onChange={(e) => onDisplayNameChange(index, e.target.value)}
          />
        </PluginFormSection>
        <PluginFormSection>
          <PluginFormTitle>折り返しの設定</PluginFormTitle>
          <PluginFormDescription>
            フィールドの幅を設定している場合にのみ有効になります。スイッチをオフにした場合、既定の幅に収まらないテキストは折り返されます。
          </PluginFormDescription>
          <PluginFormDescription last>
            スイッチをオンにした場合、テキストは折り返されず、既定の幅に収まらない場合はスクロールバーが表示されます。
          </PluginFormDescription>
          <FormControlLabel
            control={
              <Switch
                checked={viewField?.nowrap ?? false}
                onChange={(_, checked) => onNowrapChange(index, checked)}
              />
            }
            label='セル内のテキストを折り返さない'
          />
        </PluginFormSection>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Component;
