import React, { memo, FC } from 'react';

import Button from './button';
import Dialog from './dialog';

const Component: FC = () => (
  <>
    <Button />
    <Dialog />
  </>
);

export default memo(Component);
