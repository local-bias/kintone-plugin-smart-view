import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { displayingRecordsState, isFetchCompleteState } from '../../../states/records';
import { loadingState, pluginConditionState } from '../../../states/plugin';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Cell from './cell';
import { getQueryString } from '@/common/cybozu';
import { isMobile } from '@lb-ribbit/kintone-xapp';
import { Skeleton } from '@mui/material';

const Component: FC = () => {
  const records = useRecoilValue(displayingRecordsState);
  const condition = useRecoilValue(pluginConditionState)!;

  return (
    <>
      {records.map((record, i) => (
        <tr key={i}>
          <td>
            <a
              href={`${location.pathname}show${isMobile() ? '?' : '#'}record=${
                record.$id.value
              }&l.view=${condition.viewId}&l.q${getQueryString() ? `=${getQueryString()}` : ''}`}
            >
              <InsertDriveFileIcon />
            </a>
          </td>
          {condition.viewDisplayingFields.map((field, j) => (
            <td key={j} className={['NUMBER', 'CALC'].includes(record[field]?.type) ? 'right' : ''}>
              <Cell code={field} field={record[field]} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

const PlaceHolder: FC = () => {
  const isFetchComplete = useRecoilValue(isFetchCompleteState);
  const loading = useRecoilValue(loadingState);
  const condition = useRecoilValue(pluginConditionState);
  const colCount = condition?.viewDisplayingFields.length ?? 6;

  if (!loading || isFetchComplete) {
    return null;
  }

  return (
    <tr>
      <td title='キャッシュは進行中です。まだ条件に一致するレコードが存在する可能性があります。'>
        <a>
          <InsertDriveFileIcon />
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
    <tbody>
      <Suspense fallback={null}>
        <Component />
      </Suspense>
      <PlaceHolder />
    </tbody>
  );
};

export default Container;
