import {
  Autocomplete,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  InputAdornment,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';

import { viewFieldsState } from '../../../states/plugin';
import { appFieldsState } from '../../../states/app-fields';
import { useRecoilRow } from '@konomi-app/kintone-utilities-react';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

const FieldSelect: FC<{
  value: Plugin.ViewField;
  index: number;
  onFieldCodeChange: (index: number, value: string) => void;
  addRow: (index: number) => void;
  deleteRow: (index: number) => void;
  onWidthChange: (index: number, value: string) => void;
  onEditableChange: (index: number, value: boolean) => void;
  deletable: boolean;
}> = ({
  value,
  index,
  onFieldCodeChange,
  addRow,
  deleteRow,
  onWidthChange,
  onEditableChange,
  deletable,
}) => {
  const fields = useRecoilValue(appFieldsState);
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: value.id });

  return (
    <div
      ref={setNodeRef}
      className={cn('flex items-center gap-4', {
        'z-50': isDragging,
      })}
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
      <Autocomplete
        value={fields.find((field) => field.code === value.fieldCode) ?? null}
        sx={{ width: '350px' }}
        options={fields}
        isOptionEqualToValue={(option, v) => option.code === v.code}
        getOptionLabel={(option) => `${option.label}(${option.code})`}
        onChange={(_, field) => onFieldCodeChange(index, field?.code ?? '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label='対象フィールド'
            InputLabelProps={{
              ...params.InputLabelProps,
              shrink: true,
            }}
            variant='outlined'
            color='primary'
          />
        )}
      />
      <TextField
        label='表示幅'
        type='number'
        color='primary'
        value={value.width}
        sx={{ width: '120px' }}
        InputProps={{
          endAdornment: <InputAdornment position='end'>px</InputAdornment>,
        }}
        onChange={(e) => onWidthChange(index, e.target.value)}
      />
      <FormControlLabel
        control={
          <Switch
            checked={value.isEditable}
            onChange={(_, checked) => onEditableChange(index, checked)}
          />
        }
        label='編集画面に表示'
      />
      <Tooltip title='表示フィールドを追加する'>
        <IconButton size='small' onClick={() => addRow(index)}>
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {deletable && (
        <Tooltip title='この表示フィールドを削除する'>
          <IconButton size='small' onClick={() => deleteRow(index)}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

const Component: FC = () => {
  const { addRow, deleteRow } = useRecoilRow({
    state: viewFieldsState,
    getNewRow: () => ({
      id: nanoid(),
      fieldCode: '',
      width: 0,
      isEditable: true,
      joinConditionId: null,
    }),
  });
  const selectedFields = useRecoilValue(viewFieldsState);

  const onWidthChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].width = Number(value);
          })
        );
      },
    []
  );

  const onFieldCodeChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: string) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].fieldCode = value;
          })
        );
      },
    []
  );

  const onEditableChange = useRecoilCallback(
    ({ set }) =>
      (rowIndex: number, value: boolean) => {
        set(viewFieldsState, (current) =>
          produce(current, (draft) => {
            draft[rowIndex].isEditable = value;
          })
        );
      },
    []
  );

  return (
    <>
      {selectedFields.map((value, i) => (
        <FieldSelect
          key={value.id}
          value={value}
          index={i}
          onFieldCodeChange={onFieldCodeChange}
          addRow={addRow}
          deleteRow={deleteRow}
          onWidthChange={onWidthChange}
          onEditableChange={onEditableChange}
          deletable={selectedFields.length > 1}
        />
      ))}
    </>
  );
};

const Container: FC = () => {
  return (
    <div className='space-y-4'>
      <Suspense
        fallback={
          <>
            {new Array(3).fill('').map((_, i) => (
              <div key={i} className='flex items-center gap-4'>
                <Skeleton variant='rounded' width={350} height={56} />
                <Skeleton variant='rounded' width={120} height={56} />
                <FormControlLabel control={<Switch disabled />} label='編集画面に表示' />
                <IconButton size='small' disabled>
                  <AddIcon fontSize='small' />
                </IconButton>
                <IconButton size='small' disabled>
                  <DeleteIcon fontSize='small' />
                </IconButton>
              </div>
            ))}
          </>
        }
      >
        <Component />
      </Suspense>
    </div>
  );
};

const SortContainer: FC<{ className?: string }> = ({ className }) => {
  const selectedFields = useRecoilValue(viewFieldsState);

  return (
    <SortableContext items={selectedFields}>
      <Container />
    </SortableContext>
  );
};

const DnDContainer: FC = () => {
  const onDragEnd = useRecoilCallback(
    ({ set, snapshot }) =>
      async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over == null || active.id === over.id) {
          return;
        }
        const selectedFields = await snapshot.getPromise(viewFieldsState);
        const oldIndex = selectedFields.findIndex((item) => item.id === active.id);
        const newIndex = selectedFields.findIndex((item) => item.id === over.id);
        set(viewFieldsState, arrayMove(selectedFields, oldIndex, newIndex));
      },
    []
  );

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortContainer />
    </DndContext>
  );
};

export default DnDContainer;
