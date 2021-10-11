import React, { VFC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { DeepReadonly } from 'utility-types';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Record } from '@kintone/rest-api-client/lib/client/types';

import { ColoredButton } from '@common/components/colored-button';

import { filterdRecordsState } from '../../states/filterd-records';
import { pluginConditionState } from '../../states/plugin-condition';

type Props = DeepReadonly<{ condition: kintone.plugin.Condition; onClick: () => void }>;

const Component: VFC<Props> = ({ onClick }) => (
  <Tooltip title='現在の検索条件でCSVファイルを出力します'>
    <ColoredButton endIcon={<GetAppIcon />} onClick={onClick}>
      CSV
    </ColoredButton>
  </Tooltip>
);

const Container: VFC = () => {
  const condition = useRecoilValue(pluginConditionState)!;
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useRecoilCallback(({ snapshot }) => async () => {
    try {
      const records = await snapshot.getPromise(filterdRecordsState);

      if (!records.length) {
        enqueueSnackbar('対象レコードが存在しないため、CSVを出力できませんでした。', {
          variant: 'warning',
        });
        return;
      }
      download(condition, records);

      enqueueSnackbar('CSVを出力しました', { variant: 'success' });
    } catch (error) {
      console.error('CSV出力に失敗しました', error);
      enqueueSnackbar('CSV出力に失敗しました', { variant: 'error' });
    }
  });

  if (condition.enableCSVExport) {
    return <Component {...{ condition, onClick }} />;
  }
  return null;
};

export default Container;

const download = (condition: kintone.plugin.Condition, records: Record[]) => {
  const header = condition.viewDisplayingFields;

  const body = records.map((record) =>
    header.map((key) => {
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
