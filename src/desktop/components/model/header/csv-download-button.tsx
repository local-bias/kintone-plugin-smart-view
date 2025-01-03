import { TableRow } from '@/desktop/static';
import { t } from '@/lib/i18n';
import { PluginCondition } from '@/schema/plugin-config';
import styled from '@emotion/styled';
import { getFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Button, Tooltip } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { unparse as toCsv } from 'papaparse';
import { FC, FCX, useCallback } from 'react';
import { appPropertiesAtom } from '../../../states/kintone';
import { pluginConditionAtom } from '../../../states/plugin';
import { filteredTableRowsAtom } from '../../../states/records';

const Component: FCX = ({ className }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onClick = useAtomCallback(
    useCallback(async (get) => {
      try {
        const tableRows = await get(filteredTableRowsAtom);

        if (!tableRows.length) {
          enqueueSnackbar(t('desktop.app.toast.recordNotFound'), {
            variant: 'warning',
          });
          return;
        }
        const condition = await get(pluginConditionAtom);
        if (!condition) {
          enqueueSnackbar(t('desktop.app.toast.pluginConditionRetrievalError'), {
            variant: 'error',
          });
          return;
        }
        const fieldProperties = await get(appPropertiesAtom);
        download(
          condition,
          tableRows.map(({ record }) => record),
          fieldProperties
        );

        enqueueSnackbar(t('desktop.app.toast.csvExport'), { variant: 'success' });
      } catch (error) {
        console.error('CSV出力に失敗しました', error);
        enqueueSnackbar(t('desktop.app.toast.csvExportFailed'), { variant: 'error' });
      }
    }, [])
  );

  return (
    <Tooltip title={t('desktop.app.tooltip.csvExport')}>
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
  const condition = useAtomValue(pluginConditionAtom)!;

  if (condition.isCsvDownloadButtonHidden) {
    return null;
  }
  return <StyledComponent />;
};

export default Container;

const download = (
  condition: PluginCondition,
  records: kintoneAPI.RecordData[],
  fieldProperties: kintoneAPI.FieldProperties
) => {
  const targetFieldCodes = condition.viewFields.map(({ fieldCode }) => fieldCode);

  const header = targetFieldCodes.map(
    (fieldCode) => fieldProperties[fieldCode]?.label ?? fieldCode
  );

  const body = records.map((record) =>
    condition.viewFields.map(({ fieldCode }) => {
      return record[fieldCode] ? getFieldValueAsString(record[fieldCode]) : '';
    })
  );

  const csv = toCsv([header, ...body]);

  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const blob = new Blob([bom, csv], { type: 'text/csv' });
  const url = (window.URL || window.webkitURL).createObjectURL(blob);

  const link = document.createElement('a');
  link.download = 'view.csv';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
