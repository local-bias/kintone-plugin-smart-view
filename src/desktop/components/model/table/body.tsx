import { getQueryString } from '@/lib/cybozu';
import { isMobile } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import React, { FC, Suspense, useDeferredValue } from 'react';
import { useRecoilValue } from 'recoil';
import { loadingState, pluginConditionState } from '../../../states/plugin';
import { displayingTableRowsState, areAllRecordsReadyState } from '../../../states/records';
import Cell from './cell';
import { MyTableBody } from './layout';
import { DocumentIcon } from '../../ui/document-icon';

const Component: FC = () => {
  const records = useRecoilValue(displayingTableRowsState);
  const deferredRecords = useDeferredValue(records);
  const condition = useRecoilValue(pluginConditionState)!;

  return (
    <>
      {deferredRecords.map((record, i) => (
        <tr key={i}>
          <td>
            <a
              href={`${location.pathname}show${isMobile() ? '?' : '#'}record=${
                record.$id.value
              }&l.view=${condition.viewId}&l.q${getQueryString() ? `=${getQueryString()}` : ''}`}
              {...(condition.isOpenInNewTab ? { target: '_blank' } : {})}
            >
              <DocumentIcon />
            </a>
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
  const isFetchComplete = useRecoilValue(areAllRecordsReadyState);
  const loading = useRecoilValue(loadingState);
  const condition = useRecoilValue(pluginConditionState);
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
