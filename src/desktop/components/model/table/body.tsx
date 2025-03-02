import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense, useDeferredValue } from 'react';
import { loadingAtom, pluginConditionAtom } from '../../../states/plugin';
import { areAllRecordsReadyAtom, displayingTableRowsAtom } from '../../../states/records';
import { DocumentIcon } from '../../ui/document-icon';
import Cell from './cell';
import DetailsLinkCell from './cell-details-link';
import { MyTableBody } from './layout';

const Component: FC = () => {
  const records = useAtomValue(displayingTableRowsAtom);
  const deferredRecords = useDeferredValue(records);
  const condition = useAtomValue(pluginConditionAtom)!;

  return (
    <>
      {deferredRecords.map(({ record }, i) => (
        <tr key={i}>
          <td>
            <DetailsLinkCell recordId={record.$id.value as string} />
          </td>
          {condition.viewFields.map(({ fieldCode, width }, j) => (
            <td
              key={j}
              {...(width ? { 'data-custom-width': '' } : {})}
              {...(['NUMBER', 'CALC'].includes(record[fieldCode]?.type)
                ? { 'data-right': '' }
                : {})}
            >
              <Cell code={fieldCode} field={record[fieldCode]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

const PlaceHolder: FC = () => {
  const isFetchComplete = useAtomValue(areAllRecordsReadyAtom);
  const loading = useAtomValue(loadingAtom);
  const condition = useAtomValue(pluginConditionAtom);
  const colCount = condition?.viewFields.length ?? 6;

  if (!loading || isFetchComplete) {
    return null;
  }

  return (
    <tr>
      <td title='キャッシュは進行中です。まだ条件に一致するレコードが存在する可能性があります。'>
        <a>
          <DocumentIcon />
        </a>
      </td>
      {new Array(colCount).fill('').map((_, i) => (
        <td key={i}>
          <Skeleton variant='text' />
        </td>
      ))}
    </tr>
  );
};

const Container: FC = () => {
  return (
    <MyTableBody>
      <Suspense fallback={null}>
        <Component />
      </Suspense>
      <PlaceHolder />
    </MyTableBody>
  );
};

export default Container;
