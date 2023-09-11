import { FormControlLabel, Switch, Tooltip } from '@mui/material';
import React, { FC, memo } from 'react';

const Component: FC = () => {
  return (
    <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
      <FormControlLabel
        control={<Switch color='primary' defaultChecked disabled />}
        label='一覧でのレコード削除機能を有効にする'
      />
    </Tooltip>
  );
};

export default memo(Component);
