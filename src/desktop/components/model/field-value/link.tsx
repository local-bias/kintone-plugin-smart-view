import { currentAppFieldPropertiesAtom } from '@/desktop/states/kintone';
import { type kintoneAPI } from '@konomi-app/kintone-utilities';
import { Skeleton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { FC, Suspense } from 'react';

type Props = { field: kintoneAPI.field.Link; code: string };

const Component: FC<Props> = ({ field, code }) => {
  const properties = useAtomValue(currentAppFieldPropertiesAtom);
  const found = Object.entries(properties).find(([key]) => code === key);

  if (!found || ['', undefined, null].includes(field.value)) {
    return <>{field.value}</>;
  }
  const property = found[1] as kintoneAPI.property.Link;

  switch (property.protocol) {
    case 'WEB':
      return (
        <a href={field.value} target='_blank' rel='noopener noreferrer'>
          {field.value}
        </a>
      );
    case 'CALL':
      return <a href={`tel:${field.value}`}>{field.value}</a>;
    case 'MAIL':
      return <a href={`mailto:${field.value}`}>{field.value}</a>;
    default:
      return <>{field.value}</>;
  }
};

const Container: FC<Props> = (props) => {
  return (
    <Suspense fallback={<Skeleton variant='text' />}>
      <Component {...props} />
    </Suspense>
  );
};

export default Container;
