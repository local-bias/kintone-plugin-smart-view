import { Skeleton } from '@mui/material';
import React, { FC, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { kx } from '../../../../types/kintone.api';
import { appPropertiesState } from '../../../states/kintone';

type Props = { field: kx.field.Calc; code: string };

const Component: FC<Props> = ({ field, code }) => {
  const properties = useRecoilValue(appPropertiesState);
  const found = Object.entries(properties).find(([key]) => code === key);

  if (!found || ['', undefined, null].includes(field.value) || isNaN(Number(field.value))) {
    return <>{field.value}</>;
  }
  const property = found[1] as kx.property.Calc;

  const casted = Number(field.value);
  const scaled = property?.displayScale
    ? Math.round(casted * Math.pow(10, Number(property.displayScale))) /
      Math.pow(10, Number(property.displayScale))
    : casted;

  if (property?.unit) {
    if (property.unitPosition === 'BEFORE') {
      return <>{`${property.unit}${scaled}`}</>;
    } else {
      return <>{`${scaled}${property.unit}`}</>;
    }
  }

  return <>{scaled}</>;
};

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Container;
