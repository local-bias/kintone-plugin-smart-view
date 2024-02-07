import React, { ChangeEventHandler, FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { viewIdState } from '../../../states/plugin';
import { MenuItem, Skeleton, TextField } from '@mui/material';
import { customViewsState } from '../../../states/kintone';

const Component: FC = () => {
  const views = useRecoilValue(customViewsState);
  const viewId = useRecoilValue(viewIdState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useRecoilCallback(
    ({ set }) =>
      (e) => {
        set(viewIdState, e.target.value);
      },
    []
  );

  return (
    <TextField select label='一覧の名前' value={viewId} {...{ onChange }}>
      {Object.entries(views)
        .sort(([_, a], [__, b]) => Number(a.index) - Number(b.index))
        .map(([name, { id }], i) => (
          <MenuItem key={i} value={id}>
            {name}
          </MenuItem>
        ))}
    </TextField>
  );
};

const Container: FC = () => {
  return (
    <div className='[&_>div]:w-[250px]'>
      <Suspense fallback={<Skeleton variant='rounded' width={250} height={56} />}>
        <Component />
      </Suspense>
    </div>
  );
};

export default memo(Container);
