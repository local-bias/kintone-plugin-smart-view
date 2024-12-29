import { t } from '@/lib/i18n';
import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { allAppViewsErrorMessageAtom } from '../../../states/kintone';

const ViewIdFormError: FC = () => {
  const errorMessage = useAtomValue(allAppViewsErrorMessageAtom);

  if (!errorMessage) {
    return null;
  }

  return (
    <>
      {errorMessage && (
        <div className='text-red-500 text-[11px] mt-4'>
          <div>{t('config.app.form.view-id.error.title')}</div>
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default ViewIdFormError;
