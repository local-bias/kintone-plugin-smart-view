import { getCalcFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';
import { fieldPropertiesAtom } from '../../../states/kintone';

type Props = { field: kintoneAPI.field.Calc; code: string; appId: string };

const Component: FC<Props> = ({ field, code, appId }) => {
  const properties = useAtomValue(fieldPropertiesAtom(appId));
  const found = Object.entries(properties).find(([key]) => code === key);

  if (!found || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }
  const property = found[1] as kintoneAPI.property.Calc;

  return <>{getCalcFieldValueAsString({ field, property })}</>;
};

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Container;
