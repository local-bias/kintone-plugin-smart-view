import { selectableViewFieldsAtom } from '@/config/states/app-fields';
import {
  handleViewFieldChangeAtom,
  handleViewFieldWidthChangeAtom,
  selectedViewFieldDetailSettingIndexAtom,
  viewFieldsAtom,
} from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { getNewViewField } from '@/lib/plugin';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  JotaiDndContext,
  JotaiSortableContext,
  useArray,
} from '@konomi-app/kintone-utilities-jotai';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { GripVertical } from 'lucide-react';
import { FC, Suspense, useCallback } from 'react';
import Dialog from './dialog';

const Placeholder: FC = () => {
  return (
    <div className='flex items-center gap-4'>
      <div className='grid place-items-center p-4 outline-none'>
        <GripVertical className='w-5 h-5 text-gray-400' />
      </div>
      <Skeleton variant='rounded' width={350} height={56} />
      <Skeleton variant='rounded' width={120} height={56} />
      <IconButton disabled>
        <SettingsIcon />
      </IconButton>
      <IconButton size='small' disabled>
        <AddIcon fontSize='small' />
      </IconButton>
      <IconButton size='small' disabled>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </div>
  );
};

const FieldSelect: FC<{
  value: Plugin.ViewField;
  index: number;
  addRow: (index: number) => void;
  deleteRow: (index: number) => void;
  deletable: boolean;
}> = ({ value, index, addRow, deleteRow, deletable }) => {
  const fields = useAtomValue(selectableViewFieldsAtom);
  const onFieldChange = useSetAtom(handleViewFieldChangeAtom);
  const onWidthChange = useSetAtom(handleViewFieldWidthChangeAtom);
  const {
    isDragging,
    setActivatorNodeRef,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: value.id });

  const onDialogOpen = useAtomCallback(
    useCallback(
      (_, set) => {
        set(selectedViewFieldDetailSettingIndexAtom, index);
      },
      [index]
    )
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
        isOptionEqualToValue={(option, v) =>
          option.code === v.code && option.joinConditionId === v.joinConditionId
        }
        getOptionLabel={(option) =>
          `${option.appName ? `【${option.appName}】` : ''}${option.label}(${option.code})`
        }
        onChange={(_, field) => onFieldChange(index, field)}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box key={key} component='li' {...optionProps}>
              <div className='grid'>
                {option.appName && (
                  <div className='text-xs text-blue-400'>
                    {t('common.autocomplete.options.appName', option.appName)}
                  </div>
                )}
                <div className='text-xs text-gray-400'>
                  {t('common.autocomplete.options.fieldCode', option.code)}
                </div>
                {option.label}
              </div>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('config.app.form.view-fields.fieldCode.label')}
            slotProps={{ inputLabel: { shrink: true } }}
            variant='outlined'
            color='primary'
          />
        )}
      />
      <TextField
        label={t('config.app.form.view-fields.width.label')}
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
      <Tooltip title={t('config.app.form.view-fields.tooltip.showDetail')}>
        <IconButton onClick={onDialogOpen}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('config.app.form.view-fields.tooltip.addField')}>
        <IconButton size='small' onClick={() => addRow(index)}>
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      {deletable && (
        <Tooltip title={t('config.app.form.view-fields.tooltip.deleteField')}>
          <IconButton size='small' onClick={() => deleteRow(index)}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

const Component: FC = () => {
  const { addItem, deleteItem } = useArray(viewFieldsAtom);
  const selectedFields = useAtomValue(viewFieldsAtom);

  return (
    <>
      {selectedFields.map((value, i) => (
        <Suspense key={value.id} fallback={<Placeholder />}>
          <FieldSelect
            value={value}
            index={i}
            addRow={() => addItem({ index: i + 1, newItem: getNewViewField() })}
            deleteRow={deleteItem}
            deletable={selectedFields.length > 1}
          />
        </Suspense>
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
              <Placeholder key={i} />
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
      <JotaiDndContext atom={viewFieldsAtom}>
        <JotaiSortableContext atom={viewFieldsAtom}>
          <Container />
        </JotaiSortableContext>
      </JotaiDndContext>
      <Dialog />
    </>
  );
};

export default DnDContainer;
