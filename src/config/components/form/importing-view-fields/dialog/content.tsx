import React, { FC, FCX } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { DialogContent, List, ListItem, ListItemButton } from '@mui/material';
import { listViewsState } from '../../../../states/app-views';
import { storageState } from '../../../../states';
import { useSnackbar } from 'notistack';
import produce from 'immer';
import { listViewDialogShownIndexState } from '../../../../states/importing-view-fields';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;
type Props = ContainerProps &
  DeepReadonly<{
    onListItemClick: (id: string) => void;
  }>;

const Component: FCX<Props> = (props) => {
  const listViews = useRecoilValue(listViewsState);

  return (
    <List>
      {Object.entries(listViews).map(([name, { id }], i) => (
        <ListItem key={i} onClick={() => props.onListItemClick(id)}>
          <ListItemButton>{name}</ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onListItemClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async (id: string) => {
        try {
          const storage = await snapshot.getPromise(storageState);
          const viewsSnapshot = await snapshot.getPromise(listViewsState);

          if (!storage) {
            return;
          }

          const selectedView = Object.values(viewsSnapshot).find((view) => view.id === id);

          if (!selectedView) {
            enqueueSnackbar('フィールド情報の取得に失敗しました', { variant: 'error' });
            return;
          }

          set(storageState, (_storage) =>
            produce(_storage, (draft) => {
              if (!draft) {
                return;
              }
              const condition = draft.conditions[conditionIndex];

              if (selectedView.type === 'LIST') {
                condition.viewDisplayingFields = selectedView.fields;
              }
            })
          );
        } finally {
          set(listViewDialogShownIndexState, null);
        }
      },
    []
  );

  return (
    <DialogContent>
      <Component {...{ conditionIndex, onListItemClick }} />
    </DialogContent>
  );
};

export default Container;
