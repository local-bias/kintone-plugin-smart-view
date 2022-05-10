import React, { FC, VFCX } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { DeepReadonly } from 'utility-types';
import { DialogContent, List, ListItem, ListItemButton } from '@mui/material';
import { listViewsState } from '../../../../states/app-views';
import { storageState } from '../../../../states';
import { useSnackbar } from 'notistack';
import produce from 'immer';
import { ViewForResponse } from '@kintone/rest-api-client/lib/client/types';
import { listViewDialogShownIndexState } from '../../../../states/importing-view-fields';

type ContainerProps = DeepReadonly<{ conditionIndex: number }>;
type Props = ContainerProps &
  DeepReadonly<{
    listViews: Record<string, ViewForResponse>;
    onListItemClick: (id: string) => void;
  }>;

const Component: VFCX<Props> = (props) => (
  <DialogContent className={props.className}>
    <List>
      {Object.entries(props.listViews).map(([name, { id }], i) => (
        <ListItem key={i} onClick={() => props.onListItemClick(id)}>
          <ListItemButton>{name}</ListItemButton>
        </ListItem>
      ))}
    </List>
  </DialogContent>
);

const StyledComponent = styled(Component)``;

const Container: FC<ContainerProps> = ({ conditionIndex }) => {
  const setStorage = useSetRecoilState(storageState);
  const setDialogShownIndex = useSetRecoilState(listViewDialogShownIndexState);
  const listViews = useRecoilValue(listViewsState);
  const { enqueueSnackbar } = useSnackbar();

  const onListItemClick = useRecoilCallback(({ snapshot }) => async (id: string) => {
    try {
      const storage = await snapshot.getPromise(storageState);

      if (!storage) {
        return;
      }

      const selectedView = Object.values(listViews).find((view) => view.id === id);

      if (!selectedView) {
        enqueueSnackbar('フィールド情報の取得に失敗しました', { variant: 'error' });
        return;
      }

      setStorage((_storage) =>
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
      setDialogShownIndex(null);
    }
  });

  return <StyledComponent {...{ conditionIndex, listViews, onListItemClick }} />;
};

export default Container;
