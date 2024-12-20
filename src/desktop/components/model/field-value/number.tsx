import { LANGUAGE } from '@/lib/global';
import { getNumberFieldValueAsString, type kintoneAPI } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';
import { appPropertiesAtom } from '../../../states/kintone';

type Props = { field: kintoneAPI.field.Number; code: string };

const NumberFieldValue: FC<Props> = ({ field, code }) => {
  const properties = useAtomValue(appPropertiesAtom);
  const found = Object.entries(properties).find(([key]) => code === key) as
    | [string, kintoneAPI.property.Number]
    | undefined;

  if (!found || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }
  const property = found[1] as kintoneAPI.property.Number;

  return <>{getNumberFieldValueAsString({ field, property, locales: LANGUAGE })}</>;
};

const NumberFieldValueContainer: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <NumberFieldValue {...props} />
    </Suspense>
  );
};

export default NumberFieldValueContainer;
