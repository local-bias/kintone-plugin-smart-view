import { pluginConditionAtom, viewTypeAtom } from '@/desktop/states/plugin';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Button, ButtonGroup } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { FC, ReactNode, useCallback } from 'react';

const TYPES = [
  { value: 'table', icon: <TableRowsIcon /> },
  { value: 'card', icon: <ViewModuleIcon /> },
] satisfies { value: Plugin.ViewType; icon: ReactNode }[];

const Component: FC = () => {
  const viewType = useAtomValue(viewTypeAtom);

  const onChange = useAtomCallback(
    useCallback((get, set, value: Plugin.ViewType) => {
      set(viewTypeAtom, value);
    }, [])
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
  const condition = useAtomValue(pluginConditionAtom);

  if (!condition?.isViewTypeControlEnabled) {
    return null;
  }
  return <Component />;
};

export default Container;
