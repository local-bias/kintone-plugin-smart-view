import { appPropertiesState } from '@/desktop/states/kintone';
import styled from '@emotion/styled';
import { getFieldValueAsString, kintoneAPI } from '@konomi-app/kintone-utilities';
import React, { FC, FCX, Suspense } from 'react';
import { useRecoilValue } from 'recoil';

type Props = {
  fieldCode: string;
  field: kintoneAPI.Field;
};

const Component: FCX<Props> = ({ className, field, fieldCode }) => {
  const properties = useRecoilValue(appPropertiesState);
  const property = Object.values(properties).find((p) => p.code === fieldCode);

  const label = property?.label ?? fieldCode;

  return (
    <div className={className}>
      <div>{label}</div>
      <div>{getFieldValueAsString(field)}</div>
    </div>
  );
};

const PlaceHolder: FCX<Props> = ({ className, field, fieldCode }) => {
  return (
    <div className={className}>
      <div>{fieldCode}</div>
      <div>{getFieldValueAsString(field)}</div>
    </div>
  );
};

const Styling = (Component: FC<any>) => styled(Component)`
  div:nth-of-type(1) {
    font-size: 12px;
    color: #000a;
  }
`;

const StyledComponent = Styling(Component);
const StyledPlaceHolder = Styling(PlaceHolder);

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<StyledPlaceHolder {...props} />}>
      <StyledComponent {...props} />
    </Suspense>
  );
};

export default Container;
