import React, { FC } from 'react';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { pluginConditionState, viewTypeState } from '@/desktop/states/plugin';
import { Button, ButtonGroup } from '@mui/material';

const TYPES = [
  { value: 'table', icon: <TableRowsIcon /> },
  { value: 'card', icon: <ViewModuleIcon /> },
] satisfies { value: Plugin.ViewType; icon: JSX.Element }[];

const Component: FC = () => {
  const viewType = useRecoilValue(viewTypeState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (value: Plugin.ViewType) => {
        set(viewTypeState, value);
      },
    []
  );

  return (
    <ButtonGroup>
      {TYPES.map(({ value, icon }) => (
        <Button key={value} onClick={() => onChange(value)} disabled={viewType === value}>
          {icon}
        </Button>
      ))}
      Button
    </ButtonGroup>
  );
};

const Container: FC = () => {
  const condition = useRecoilValue(pluginConditionState);

  if (!condition?.isViewTypeControlEnabled) {
    return null;
  }
  return <Component />;
};

export default Container;
