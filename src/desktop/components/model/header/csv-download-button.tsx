import React, { FC, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';
import { Button, Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';

import { filteredRecordsState } from '../../../states/records';
import { pluginConditionState } from '../../../states/plugin';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { appPropertiesState } from '../../../states/kintone';

const Component: FCX = ({ className }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        try {
          const records = await snapshot.getPromise(filteredRecordsState);

          if (!records.length) {
            enqueueSnackbar('対象レコードが存在しないため、CSVを出力できませんでした。', {
              variant: 'warning',
            });
            return;
          }
          const condition = await snapshot.getPromise(pluginConditionState);
          if (!condition) {
            enqueueSnackbar('プラグインの設定情報の取得に失敗しました', {
              variant: 'error',
            });
            return;
          }
          const fieldProperties = await snapshot.getPromise(appPropertiesState);
          download(condition, records, fieldProperties);

          enqueueSnackbar('CSVを出力しました', { variant: 'success' });
        } catch (error) {
          console.error('CSV出力に失敗しました', error);
          enqueueSnackbar('CSV出力に失敗しました', { variant: 'error' });
        }
      },
    []
  );

  return (
    <Tooltip title='現在の検索条件でCSVファイルを出力します'>
      <Button
        {...{ className }}
        variant='contained'
        color='inherit'
        endIcon={<GetAppIcon />}
        onClick={onClick}
      >
        CSV
      </Button>
    </Tooltip>
  );
};

const StyledComponent = styled(Component)`
  color: #1976d2;
  background-color: #f1f1f7;
  &:hover,
  &:active {
    background-color: #e1e1ea;
  }
`;

const Container: FC = () => {
  const condition = useRecoilValue(pluginConditionState)!;

  if (condition.isCsvDownloadButtonHidden) {
    return null;
  }
  return <StyledComponent />;
};

export default Container;

const download = (
  condition: Plugin.Condition,
  records: kintoneAPI.RecordData[],
  fieldProperties: kintoneAPI.FieldProperties
) => {
  const targetFieldCodes = condition.viewFields.map(({ fieldCode }) => fieldCode);

  const header = targetFieldCodes.map(
    (fieldCode) => fieldProperties[fieldCode]?.label ?? fieldCode
  );

  const body = records.map((record) =>
    targetFieldCodes.map((key) => {
      const field = record[key];
      if (!field) {
        return '';
      }

      switch (field.type) {
        case 'CREATOR':
        case 'MODIFIER':
          return `"${field.value.name ?? ''}"`;
        case 'CHECK_BOX':
        case 'MULTI_SELECT':
        case 'CATEGORY':
          return `"${field.value.join('\r')}"`;
        case 'USER_SELECT':
        case 'ORGANIZATION_SELECT':
        case 'GROUP_SELECT':
        case 'STATUS_ASSIGNEE':
          return `"${field.value.map(({ name }) => name).join('\r')}"`;
        case 'FILE':
          return `"${field.value.map(({ name }) => name).join('\r')}"`;
        case 'SUBTABLE':
          return `"${field.value.length}行"`;
        default:
          return `"${field.value ?? ''}"`;
      }
    })
  );

  const data = [header, ...body].map((row) => row.join(',')).join('\r\n');

  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, data], { type: 'text/csv' });
  const url = (window.URL || window.webkitURL).createObjectURL(blob);

  const link = document.createElement('a');
  link.download = 'view.csv';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
