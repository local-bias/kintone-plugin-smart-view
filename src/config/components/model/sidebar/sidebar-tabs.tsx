import { customViewsState } from '@/config/states/kintone';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from '@emotion/styled';
import { GripVertical } from 'lucide-react';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { conditionsState, selectedConditionIdState } from '../../../states/plugin';
import { useTab } from './use-tab';
import { RecoilDndContext, RecoilSortableContext } from '@konomi-app/kintone-utilities-react';

const SidebarTab: FC<{ condition: Plugin.Condition; index: number }> = ({ condition, index }) => {
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: condition.id });
  const { onTabChange } = useTab();
  const selectedId = useRecoilValue(selectedConditionIdState);
  const views = useRecoilValue(customViewsState);
  const found = Object.values(views).find((view) => view.id === condition.viewId);

  const onClick = () => onTabChange(condition);

  const label = (
    <>
      <div className='text-[11px] leading-4 text-gray-400'>設定{index + 1}</div>
      <div className='text-sm text-gray-600'>{`${found?.name ? found.name : '未設定'}`}</div>
    </>
  );

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'border-0 border-r-2 border-solid border-transparent grid grid-cols-[auto_1fr] bg-background items-center transition-colors active:bg-blue-100/70',
        {
          'z-50 shadow-md': isDragging,
          'border-blue-600 bg-blue-100/30 text-blue-600': selectedId === condition.id,
        }
      )}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div
        className='grid place-items-center py-3 px-4 outline-none'
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        tabIndex={-1}
      >
        <GripVertical className='w-5 h-5 text-gray-400' />
      </div>
      <button
        role='button'
        tabIndex={0}
        onClick={onClick}
        className='py-3 px-4 pl-0 bg-transparent border-0 cursor-pointer outline-none text-left text-gray-600 text-sm'
      >
        {label}
      </button>
    </div>
  );
};

const Component: FC<{ className?: string }> = ({ className }) => {
  const conditions = useRecoilValue(conditionsState);

  return (
    <div className={cn(className, 'h-full')}>
      {conditions.map((condition, index) => (
        <SidebarTab key={condition.id} condition={condition} index={index} />
      ))}
    </div>
  );
};

const StyledComponent = styled(Component)`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0004;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Container: FC = () => {
  return (
    <RecoilDndContext state={conditionsState}>
      <RecoilSortableContext state={conditionsState}>
        <StyledComponent />
      </RecoilSortableContext>
    </RecoilDndContext>
  );
};

export default Container;
