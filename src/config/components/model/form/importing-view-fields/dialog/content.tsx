import React, { FC, FCX, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import { DialogContent, List, ListItem, ListItemButton, Skeleton } from '@mui/material';
import { listViewsState } from '../../../../../states/kintone';
import { storageState } from '../../../../../states/plugin';
import { useSnackbar } from 'notistack';
import produce from 'immer';
import { listViewDialogShownIndexState } from '../../../../../states/importing-view-fields';
import { Loading } from '@common/components/loading';
import { useConditionIndex } from '../../../../condition-index-provider';

type Props = DeepReadonly<{
  onListItemClick: (id: string) => void;
}>;

const Component: FCX<Props> = (props) => {
  const listViews = useRecoilValue(listViewsState);

  if (!listViews) {
    return (
      <div>
        <Skeleton height={32} />
        <Skeleton height={32} />
        <Skeleton height={32} />
      </div>
    );
  }

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

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const conditionIndex = useConditionIndex();

  const onListItemClick = useRecoilCallback(
    ({ snapshot, set }) =>
      async (id: string) => {
        try {
          const storage = await snapshot.getPromise(storageState);
          const viewsSnapshot = await snapshot.getPromise(listViewsState);

          if (!storage || !viewsSnapshot) {
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
      <Suspense fallback={<Loading label='アプリ情報を取得しています' />}>
        <Component {...{ conditionIndex, onListItemClick }} />
      </Suspense>
    </DialogContent>
  );
};

export default Container;
