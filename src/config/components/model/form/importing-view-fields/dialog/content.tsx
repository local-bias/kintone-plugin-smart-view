import { getNewViewField } from '@/lib/plugin';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { DialogContent, List, ListItem, ListItemButton, Skeleton } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { FC, FCX, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import type { DeepReadonly } from 'utility-types';
import { listViewDialogShownState } from '../../../../../states/importing-view-fields';
import { listViewsState } from '../../../../../states/kintone';
import { getConditionPropertyState } from '../../../../../states/plugin';

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

  const onListItemClick = useRecoilCallback(
    ({ reset, snapshot, set }) =>
      async (id: string) => {
        try {
          const viewsSnapshot = await snapshot.getPromise(listViewsState);

          if (!viewsSnapshot) {
            return;
          }

          const selectedView = Object.values(viewsSnapshot).find((view) => view.id === id);

          if (!selectedView) {
            enqueueSnackbar('フィールド情報の取得に失敗しました', { variant: 'error' });
            return;
          }

          if (selectedView.type === 'LIST') {
            set(
              getConditionPropertyState('viewFields'),
              selectedView.fields.map((fieldCode) => ({
                ...getNewViewField(),
                fieldCode,
              }))
            );
          }
        } finally {
          reset(listViewDialogShownState);
        }
      },
    []
  );

  return (
    <DialogContent>
      <Suspense fallback={<LoaderWithLabel label='アプリ情報を取得しています' />}>
        <Component {...{ onListItemClick }} />
      </Suspense>
    </DialogContent>
  );
};

export default Container;
