import { conditionsState, selectedConditionIdState } from '@/config/states/plugin';
import { getNewCondition, PluginCondition, validatePluginCondition } from '@/lib/plugin';
import { BundledSidebar } from '@konomi-app/kintone-utilities-react';
import { Skeleton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FC, Suspense } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { customViewsState } from '../states/kintone';

const AwaitedLabel: FC<{ condition: PluginCondition }> = ({ condition }) => {
  const views = useRecoilValue(customViewsState);
  const found = Object.values(views).find((view) => view.id === condition.viewId);
  return <>{`${found?.name ?? '未設定'}`}</>;
};

const Label: FC<{ condition: PluginCondition; index: number }> = ({ condition, index }) => {
  return (
    <div>
      <div className='text-[11px] leading-4 text-gray-400'>設定{index + 1}</div>
      <div className='text-sm text-gray-600'>
        <Suspense fallback={<Skeleton variant='text' width={120} />}>
          <AwaitedLabel condition={condition} />
        </Suspense>
      </div>
    </div>
  );
};

const Sidebar: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [conditions, setConditions] = useRecoilState(conditionsState);
  const [selectedConditionId, setSelectedConditionId] = useRecoilState(selectedConditionIdState);
  const label = (params: { condition: PluginCondition; index: number }) => <Label {...params} />;

  const onSelectedConditionChange = (condition: PluginCondition | null) => {
    setSelectedConditionId(condition?.id ?? conditions[0].id);
  };

  const onConditionDelete = () => {
    enqueueSnackbar('設定情報を削除しました', { variant: 'success' });
  };

  return (
    <BundledSidebar
      conditions={conditions}
      setConditions={setConditions}
      getNewCondition={getNewCondition}
      labelComponent={label}
      onSelectedConditionChange={onSelectedConditionChange}
      selectedConditionId={selectedConditionId}
      onConditionDelete={onConditionDelete}
      context={{
        onCopy: () => {
          console.log('copied');
          enqueueSnackbar('設定情報をコピーしました', { variant: 'success' });
        },
        onPaste: () => {
          enqueueSnackbar('設定情報を貼り付けました', { variant: 'success' });
          return null;
        },
        onPasteFailure: () => {
          enqueueSnackbar('設定情報の形式が正しくありません', { variant: 'error' });
        },
        onPasteValidation: (condition) => {
          try {
            validatePluginCondition(condition);
          } catch (error) {
            return false;
          }
          return true;
        },
        onPasteValidationError: () => {
          enqueueSnackbar('設定情報の形式が正しくありません', { variant: 'error' });
        },
      }}
    />
  );
};

export default Sidebar;
