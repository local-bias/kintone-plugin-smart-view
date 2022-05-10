import React, { memo, FC } from 'react';

import Button from './button';
import Dialog from './dialog';

type Props = Readonly<{ conditionIndex: number }>;

const Component: FC<Props> = memo((props) => (
  <>
    <Button conditionIndex={props.conditionIndex} />
    <Dialog conditionIndex={props.conditionIndex} />
  </>
));

export default Component;
