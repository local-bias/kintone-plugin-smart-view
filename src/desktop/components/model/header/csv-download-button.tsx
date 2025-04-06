import { t } from '@/lib/i18n';
import { PluginCondition } from '@/schema/plugin-config';
import styled from '@emotion/styled';
import { getFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Button, Tooltip } from '@mui/material';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { enqueueSnackbar } from 'notistack';
import { unparse as toCsv } from 'papaparse';
import { FC, FCX } from 'react';
import { currentAppFieldPropertiesAtom } from '../../../states/kintone';
import { pluginConditionAtom } from '../../../states/plugin';
import { filteredTableRowsAtom } from '../../../states/records';
import { TableRow } from '@/desktop/static';

const handleDownloadAtom = atom(null, async (get) => {
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
    const fieldProperties = await get(currentAppFieldPropertiesAtom);
    download(condition, tableRows, fieldProperties);

    enqueueSnackbar(t('desktop.app.toast.csvExport'), { variant: 'success' });
  } catch (error) {
    console.error('CSV出力に失敗しました', error);
    enqueueSnackbar(t('desktop.app.toast.csvExportFailed'), { variant: 'error' });
  }
});

const CsvDownloadButtonComponent: FCX = ({ className }) => {
  const download = useSetAtom(handleDownloadAtom);

  return (
    <Tooltip title={t('desktop.app.tooltip.csvExport')}>
      <Button
        {...{ className }}
        variant='contained'
        color='inherit'
        endIcon={<GetAppIcon />}
        onClick={download}
      >
        CSV
      </Button>
    </Tooltip>
  );
};

const StyledCsvDownloadButtonComponent = styled(CsvDownloadButtonComponent)`
  color: #1976d2;
  background-color: #f1f1f7;
  &:hover,
  &:active {
    background-color: #e1e1ea;
  }
`;

const CsvDownloadButton: FC = () => {
  const condition = useAtomValue(pluginConditionAtom)!;

  if (condition.isCsvDownloadButtonHidden) {
    return null;
  }
  return <StyledCsvDownloadButtonComponent />;
};

export default CsvDownloadButton;

const download = (
  condition: PluginCondition,
  records: TableRow[],
  fieldProperties: kintoneAPI.FieldProperties
) => {
  const targetFieldCodes = condition.viewFields.map(({ fieldCode }) => fieldCode);

  const header = targetFieldCodes.map(
    (fieldCode) => fieldProperties[fieldCode]?.label ?? fieldCode
  );

  const body = records.map(({ record }) =>
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
  document.body?.removeChild(link);
};
