import { t } from '@/lib/i18n';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeEventHandler, FC, Suspense } from 'react';
import { customViewsAtom } from '../../../states/kintone';
import { viewIdAtom } from '../../../states/plugin';

const ViewIdForm: FC = () => {
  const views = useAtomValue(customViewsAtom);
  const [viewId, setViewId] = useAtom(viewIdAtom);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setViewId(e.target.value);
  };

  return (
    <TextField select label={t('config.app.form.view-id.label')} value={viewId} {...{ onChange }}>
      {Object.entries(views)
        .sort(([, a], [, b]) => Number(a.index) - Number(b.index))
        .map(([name, { id }], i) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
    </TextField>
  );
};

const ViewIdFormContainer: FC = () => {
  return (
    <div className='[&_>div]:w-[250px]'>
      <Suspense fallback={<Skeleton variant='rounded' width={250} height={56} />}>
        <ViewIdForm />
      </Suspense>
    </div>
  );
};

export default ViewIdFormContainer;
