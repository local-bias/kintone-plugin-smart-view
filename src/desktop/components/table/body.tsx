import React, { FC } from 'react';
import { DeepReadonly } from 'utility-types';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { useRecoilValue } from 'recoil';
import { displayingRecordsState } from '../../states/records';
import { pluginConditionState } from '../../states/plugin-condition';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Cell from './cell';
import { getQueryString } from '@common/cybozu';
import { isMobile } from '@common/kintone';

type Props = DeepReadonly<{ records: Record[]; condition: kintone.plugin.Condition }>;

const Component: FC<Props> = ({ records, condition }) => (
  <tbody>
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
        {condition.displayingFields.map(({ code, width }, j) => (
          <td
            key={j}
            style={width !== 0 ? { width } : { whiteSpace: 'nowrap' }}
            className={['NUMBER', 'CALC'].includes(record[code]?.type) ? 'right' : ''}
          >
            <Cell code={code} field={record[code]} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

const Container: FC = () => {
  const records = useRecoilValue(displayingRecordsState);
  const condition = useRecoilValue(pluginConditionState)!;

  return <Component {...{ records, condition }} />;
};

export default Container;
