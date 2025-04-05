import type { kintoneAPI } from '@konomi-app/kintone-utilities';
import { FC } from 'react';
import type { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{ field: kintoneAPI.field.RichText }>;

const RichTextFieldValue: FC<Props> = (props) => {
  return <div dangerouslySetInnerHTML={{ __html: props.field.value }} />;
};

export default RichTextFieldValue;
