import { pluginConditionsAtom, selectedConditionIdAtom } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { getNewCondition, validatePluginCondition } from '@/lib/plugin';
import { PluginCondition } from '@/schema/plugin-config';
import { BundledSidebar } from '@konomi-app/kintone-utilities-react';
import { Skeleton } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { useSnackbar } from 'notistack';
import { FC, Suspense } from 'react';
import { customViewsAtom } from '../states/kintone';

const AwaitedLabel: FC<{ condition: PluginCondition }> = ({ condition }) => {
  const views = useAtomValue(customViewsAtom);
  const found = Object.values(views).find((view) => view.id === condition.viewId);
  return <>{`${found?.name ?? t('config.app.sidebar.label.default')}`}</>;
};

const Label: FC<{ condition: PluginCondition; index: number }> = ({ condition, index }) => {
  return (
    <div>
      <div className='text-[11px] leading-4 text-gray-400'>
        {t('config.app.sidebar.label.heading')}
        {index + 1}
      </div>
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
  const [conditions, setConditions] = useAtom(pluginConditionsAtom);
  const [selectedConditionId, setSelectedConditionId] = useAtom(selectedConditionIdAtom);
  const label = (params: { condition: PluginCondition; index: number }) => <Label {...params} />;

  const onSelectedConditionChange = (condition: PluginCondition | null) => {
    setSelectedConditionId(condition?.id ?? conditions[0].id);
  };

  const onConditionDelete = () => {
    enqueueSnackbar(t('config.app.sidebar.toast.delete'), { variant: 'success' });
  };

  return (
    <BundledSidebar
      appendButtonLabel={t('config.app.sidebar.append-button.label')}
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
          enqueueSnackbar(t('config.app.sidebar.toast.copy'), { variant: 'success' });
        },
        onPaste: () => {
          enqueueSnackbar(t('config.app.sidebar.toast.paste'), { variant: 'success' });
          return null;
        },
        onPasteFailure: () => {
          enqueueSnackbar(t('config.app.sidebar.toast.paste.failure'), { variant: 'error' });
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
          enqueueSnackbar(t('config.app.sidebar.toast.paste.error.validation'), {
            variant: 'error',
          });
        },
      }}
    />
  );
};

export default Sidebar;
