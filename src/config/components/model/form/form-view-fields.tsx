import {
  Autocomplete,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { produce } from 'immer';
import { selectedViewFieldDetailSettingIndexState, viewFieldsState } from '@/config/states/plugin';
import { appFieldsState } from '../../../states/app-fields';
import { useRecoilRow } from '@konomi-app/kintone-utilities-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';
import { RecoilDndContext } from '@/lib/components/recoil-dnd-context';
import { RecoilSortableContext } from '@/lib/components/recoil-sortable-context';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from './dialog';
import { getNewViewField } from '@/lib/plugin';

const FieldSelect: FC<{
  value: Plugin.ViewField;
  index: number;
  onFieldCodeChange: (index: number, value: string) => void;
  addRow: (index: number) => void;
  deleteRow: (index: number) => void;
  onWidthChange: (index: number, value: string) => void;
  deletable: boolean;
}> = ({ value, index, onFieldCodeChange, addRow, deleteRow, onWidthChange, deletable }) => {
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

  const onDialogOpen = useRecoilCallback(
    ({ set }) =>
      () => {
        set(selectedViewFieldDetailSettingIndexState, index);
      },
    [index]
  );

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
            slotProps={{ inputLabel: { shrink: true } }}
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
        slotProps={{
          input: {
            endAdornment: <InputAdornment position='end'>px</InputAdornment>,
          },
        }}
        onChange={(e) => onWidthChange(index, e.target.value)}
      />
      <Tooltip title='このフィールドの詳細設定を開く'>
        <IconButton onClick={onDialogOpen}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
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
    getNewRow: () => getNewViewField(),
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

const DnDContainer: FC = () => {
  return (
    <>
      <RecoilDndContext state={viewFieldsState}>
        <RecoilSortableContext state={viewFieldsState}>
          <Container />
        </RecoilSortableContext>
      </RecoilDndContext>
      <Dialog />
    </>
  );
};

export default DnDContainer;
