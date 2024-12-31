import { joinConditionsAtom } from '@/config/states/plugin';
import { JotaiDndContext, JotaiSortableContext } from '@konomi-app/kintone-utilities-jotai';
import { FC } from 'react';
import Form from './form';

const Component: FC = () => (
  <JotaiDndContext atom={joinConditionsAtom}>
    <JotaiSortableContext atom={joinConditionsAtom}>
      <Form />
    </JotaiSortableContext>
  </JotaiDndContext>
);

export default Component;
