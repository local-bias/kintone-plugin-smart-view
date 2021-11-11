import React, { VFC } from 'react';
import { DeepReadonly } from 'utility-types';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { useRecoilValue } from 'recoil';
import { displayingRecordsState } from '../../states/displaying-records';
import { pluginConditionState } from '../../states/plugin-condition';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import Cell from './cell';

type Props = DeepReadonly<{ records: Record[]; condition: kintone.plugin.Condition }>;

const Component: VFC<Props> = ({ records, condition }) => (
  <tbody>
    {records.map((record, i) => (
      <tr key={i}>
        <td>
          <a href={`${location.pathname}show#record=${record.$id.value}`}>
            <InsertDriveFileIcon />
          </a>
        </td>
        {condition.viewDisplayingFields.map((field, j) => (
          <td key={j}>
            <Cell code={field} field={record[field]} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

const Container: VFC = () => {
  const records = useRecoilValue(displayingRecordsState);
  const condition = useRecoilValue(pluginConditionState)!;

  return <Component {...{ records, condition }} />;
};

export default Container;
