import { getNewViewField } from '@/lib/plugin';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import { DialogContent, List, ListItem, ListItemButton, Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, FCX, Suspense, useCallback } from 'react';
import type { DeepReadonly } from 'utility-types';
import { listViewDialogShownAtom } from '../../../../../states/importing-view-fields';
import { listViewsAtom } from '../../../../../states/kintone';
import { getConditionPropertyAtom } from '../../../../../states/plugin';

type Props = DeepReadonly<{
  onListItemClick: (id: string) => void;
}>;

const Component: FCX<Props> = (props) => {
  const listViews = useAtomValue(listViewsAtom);

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

  const onListItemClick = useAtomCallback(
    useCallback(async (get, set, id: string) => {
      try {
        const viewsSnapshot = await get(listViewsAtom);

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
            getConditionPropertyAtom('viewFields'),
            selectedView.fields.map((fieldCode) => ({
              ...getNewViewField(),
              fieldCode,
            }))
          );
        }
      } finally {
        set(listViewDialogShownAtom, false);
      }
    }, [])
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
