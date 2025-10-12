import { currentAppFieldPropertiesAtom } from '@/desktop/states/kintone';
import styled from '@emotion/styled';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import { useAtomValue } from 'jotai';
import { FC, FCX, Suspense } from 'react';
import { FieldValue } from '../field-value';

type Props = {
  fieldCode: string;
  field: kintoneAPI.Field;
};

const FieldLabel: FC<{ fieldCode: string }> = ({ fieldCode }) => {
  const properties = useAtomValue(currentAppFieldPropertiesAtom);
  const property = Object.values(properties).find((p) => p.code === fieldCode);

  const label = property?.label ?? fieldCode;

  return <>{label}</>;
};

const Component: FCX<Props> = ({ className, field, fieldCode }) => {
  return (
    <div className={className}>
      <div>
        <Suspense fallback={<div>{fieldCode}</div>}>
          <FieldLabel fieldCode={fieldCode} />
        </Suspense>
      </div>
      <div>
        <FieldValue code={fieldCode} field={field} />
      </div>
    </div>
  );
};

const Styling = (Component: FC<any>) => styled(Component)`
  > div:nth-of-type(1) {
    font-size: 12px;
    color: #000a;
  }
`;

const StyledComponent = Styling(Component);

const Container: FC<Props> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
