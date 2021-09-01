import React, { VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { useRecoilValue } from 'recoil';
import { displayingRecordsState } from '../../states/displaying-records';
import { pluginConditionState } from '../../states/plugin-condition';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import Cell from './cell';

type ContainerProps = DeepReadonly<{}>;
type Props = ContainerProps &
  DeepReadonly<{ records: Record[]; condition: kintone.plugin.Condition }>;

const Component: VFCX<Props> = ({ className, records, condition }) => (
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
            <Cell field={record[field]} />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  const records = useRecoilValue(displayingRecordsState);
  const condition = useRecoilValue(pluginConditionState)!;

  return <StyledComponent {...{ records, condition }} />;
};

export default Container;
