import { loadingAtom } from '@/desktop/states/ui';
import { TableRow } from '@/desktop/static';
import { isProd } from '@/lib/global';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense, useDeferredValue } from 'react';
import {
  pluginConditionAtom,
  resolvedTableColumnsAtom,
} from '../../../states/plugin';
import { areAllCurrentAppRecordsReadyAtom, displayingTableRowsAtom } from '../../../states/records';
import { DocumentIcon } from '../../ui/document-icon';
import Cell from './cell';
import DetailsLinkCell from './cell-details-link';
import { MyTableBody } from './layout';

// React 19: Component will be automatically optimized by React Compiler
const TableBodyRow = (props: { tableRow: TableRow; }) => {
  const { tableRow } = props;
  const recordId = tableRow.record.$id.value as string;
  const columns = useAtomValue(resolvedTableColumnsAtom);

  return (
    <tr>
      <td>
        <DetailsLinkCell recordId={recordId} />
      </td>
      {columns.map((column) => {
        const { id, fieldCode, width, appId } = column;
        const field = record?.[fieldCode];
        if (!field) {
          return <td key={id}>{!isProd ? '⚠' : ''}</td>;
        }
        return (
          <td
            key={id}
            {...(width ? { 'data-custom-width': '' } : {})}
            {...(['NUMBER', 'CALC'].includes(field.type) ? { 'data-right': '' } : {})}
          >
            <Cell col={column} code={fieldCode} field={field} appId={appId} />
          </td>
        );
      })}
    </tr>
  );
};

const TableBodyComponent: FC = () => {
  const records = useAtomValue(displayingTableRowsAtom);
  const deferredRecords = useDeferredValue(records);

  return (
    <>
      {deferredRecords.map((tableRow, i) => (
        <TableBodyRow key={i} tableRow={tableRow} />
      ))}
    </>
  );
};

const PlaceHolder: FC = () => {
  const isFetchComplete = useAtomValue(areAllCurrentAppRecordsReadyAtom);
  const loading = useAtomValue(loadingAtom);
  const condition = useAtomValue(pluginConditionAtom);
  const colCount = condition?.viewFields.length ?? 6;

  if (!loading || isFetchComplete) {
    return null;
  }

  // React 19 optimized: Use Array.from with predictable pattern instead of Array.fill
  const skeletonCells = Array.from({ length: colCount }, (_, i) => (
    <td key={i}>
      <Skeleton variant='text' />
    </td>
  ));

  return (
    <tr>
      <td title='キャッシュは進行中です。まだ条件に一致するレコードが存在する可能性があります。'>
        <a>
          <DocumentIcon />
        </a>
      </td>
      {skeletonCells}
    </tr>
  );
};

const TableBody: FC = () => {
  return (
    <MyTableBody>
      <Suspense fallback={null}>
        <TableBodyComponent />
      </Suspense>
      <PlaceHolder />
    </MyTableBody>
  );
};

export default TableBody;
