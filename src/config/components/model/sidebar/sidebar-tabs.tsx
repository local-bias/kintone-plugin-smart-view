import React, { FC } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { conditionsState, selectedConditionIdState, storageState } from '../../../states/plugin';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useTab } from './use-tab';
import styled from '@emotion/styled';
import { customViewsState } from '@/config/states/kintone';

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

  const label = found ? <>{`設定${index + 1}(${found.name})`}</> : <>{`設定${index + 1}`}</>;

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
        className='grid place-items-center p-4 outline-none'
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
        className='p-4 pl-0 bg-transparent border-0 cursor-pointer outline-none text-left text-gray-600 text-sm'
      >
        {label}
      </button>
    </div>
  );
};

const Component: FC<{ className?: string }> = ({ className }) => {
  const conditions = useRecoilValue(conditionsState);

  return (
    <SortableContext items={conditions}>
      <div className={cn(className, 'h-full')}>
        {conditions.map((condition, index) => (
          <SidebarTab key={condition.id} condition={condition} index={index} />
        ))}
      </div>
    </SortableContext>
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
  const onDragEnd = useRecoilCallback(
    ({ set, snapshot }) =>
      async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const storage = await snapshot.getPromise(storageState);
        const conditions = storage.conditions;
        const oldIndex = conditions.findIndex((item) => item.id === active.id);
        const newIndex = conditions.findIndex((item) => item.id === over.id);
        const newConditions = arrayMove(conditions, oldIndex, newIndex);
        set(storageState, { ...storage, conditions: newConditions });
      },
    []
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <StyledComponent />
    </DndContext>
  );
};

export default Container;
