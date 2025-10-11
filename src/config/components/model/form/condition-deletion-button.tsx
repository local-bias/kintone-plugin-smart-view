import { PluginConditionDeleteButton } from '@konomi-app/kintone-utilities-react';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback, useResetAtom } from 'jotai/utils';
import { useSnackbar } from 'notistack';
import { FC, useCallback } from 'react';
import { pluginConfigAtom, selectedConditionIdAtom } from '../../../states/plugin';

const Container: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const storage = useAtomValue(pluginConfigAtom);
  const resetConditionId = useResetAtom(selectedConditionIdAtom);

  const onClick = useAtomCallback(
    useCallback(async (get, set) => {
      const id = await get(selectedConditionIdAtom);
      set(pluginConfigAtom, (_, _storage = _!) =>
        produce(_storage, (draft) => {
          const index = draft.conditions.findIndex((condition) => condition.id === id);
          draft.conditions.splice(index, 1);
        })
      );
      resetConditionId();
      enqueueSnackbar('設定を削除しました', { variant: 'success' });
    }, [])
  );

  if ((storage?.conditions.length ?? 0) < 2) {
    return null;
  }

  return <PluginConditionDeleteButton {...{ onClick }} />;
};

export default Container;
