import { Skeleton } from '@mui/material';
import { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { appPropertiesState } from '../../../states/kintone';
import { LANGUAGE } from '@/lib/global';

type Props = { field: kintoneAPI.field.Number; code: string };

const Component: FC<Props> = ({ field, code }) => {
  const properties = useRecoilValue(appPropertiesState);
  const found = Object.entries(properties).find(([key]) => code === key);

  if (!found || ['', undefined, null].includes(field.value) || isNaN(Number(field.value))) {
    return <>{field.value}</>;
  }
  const property = found[1] as kintoneAPI.property.Number;

  const casted = Number(field.value);
  const scaled = property?.displayScale
    ? Math.round(casted * Math.pow(10, Number(property.displayScale))) /
      Math.pow(10, Number(property.displayScale))
    : casted;
  const separated = property?.digit
    ? Number(scaled).toLocaleString(LANGUAGE, {
        maximumFractionDigits: Number(property?.displayScale ?? 0),
        minimumFractionDigits: Number(property?.displayScale ?? 0),
      })
    : Number(scaled).toFixed(Number(property?.displayScale ?? 0));

  if (property?.unit) {
    if (property.unitPosition === 'BEFORE') {
      return <>{`${property.unit}${separated}`}</>;
    } else {
      return <>{`${separated}${property.unit}`}</>;
    }
  }

  return <>{separated}</>;
};

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Container;
