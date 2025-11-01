import { isFieldSettingsDialogOpenAtom, visibleFieldsAtom } from '@/desktop/states/visible-fields';
import { currentAppFieldPropertiesAtom } from '@/desktop/states/kintone';
import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Paper,
  Chip,
} from '@mui/material';
import { useAtomValue, useAtom } from 'jotai';
import { FC, memo, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const StyledDialog = styled(Dialog)`
  & > div {
    & > div {
      min-height: 70vh;
      max-height: 85vh;
      @media (max-width: 600px) {
        margin-left: 0;
        margin-right: 0;
        width: 95vw;
      }

      .MuiDialogContent-root {
        position: relative;
        padding: 24px;
      }
    }
  }
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #1976d2;
    border-radius: 2px;
  }
`;

const FieldCard = styled(Paper)<{ isDragging?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #e0e0e0;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  cursor: ${(props) => (props.isDragging ? 'grabbing' : 'default')};

  ${(props) =>
    !props.isDragging &&
    `
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
    
    &:hover {
      border-color: #1976d2;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.15);
    }
  `}

  &:last-child {
    margin-bottom: 0;
  }
`;

const DragHandle = styled.div`
  display: flex;
  align-items: center;
  cursor: grab;
  color: #999;
  user-select: none;
  touch-action: none;

  &:hover {
    color: #1976d2;
  }

  &:active {
    cursor: grabbing;
  }
`;

const FieldInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FieldLabel = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FieldCode = styled(Typography)`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Consolas', 'Monaco', monospace;
`;

const AvailableFieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding: 4px;
`;

const AvailableFieldCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #fafafa;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #1976d2;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.1);

    button {
      opacity: 1;
    }
  }
`;

const AvailableFieldInfo = styled.div`
  flex: 1;
  margin-bottom: 8px;
`;

const AddButton = styled(Button)`
  opacity: 0.7;
  transition: opacity 0.2s;
  font-size: 12px;
  padding: 4px 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #999;
  font-size: 14px;
`;

interface SortableItemProps {
  id: string;
  fieldCode: string;
  label: string;
  onRemove: () => void;
}

const SortableItem: FC<SortableItemProps> = memo(({ id, fieldCode, label, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition: isDragging ? 'none' : transition,
    }),
    [transform, transition, isDragging]
  );

  return (
    <FieldCard ref={setNodeRef} style={style} isDragging={isDragging} elevation={0}>
      <DragHandle {...attributes} {...listeners}>
        <DragIndicatorIcon />
      </DragHandle>
      <FieldInfo>
        <FieldLabel>{label}</FieldLabel>
        <FieldCode>{fieldCode}</FieldCode>
      </FieldInfo>
      <IconButton size='small' onClick={onRemove} color='error'>
        <CloseIcon fontSize='small' />
      </IconButton>
    </FieldCard>
  );
});

const FieldSettingsDialog: FC = () => {
  const [open, setOpen] = useAtom(isFieldSettingsDialogOpenAtom);
  const [visibleFields, setVisibleFields] = useAtom(visibleFieldsAtom);
  const appFields = useAtomValue(currentAppFieldPropertiesAtom);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setVisibleFields((fields) => {
          const oldIndex = fields.findIndex((field) => field.id === active.id);
          const newIndex = fields.findIndex((field) => field.id === over.id);
          return arrayMove(fields, oldIndex, newIndex);
        });
      }
    },
    [setVisibleFields]
  );

  const handleAddField = useCallback(
    (fieldCode: string) => {
      const field = appFields?.[fieldCode];
      if (field) {
        setVisibleFields((fields) => [
          ...fields,
          {
            id: nanoid(),
            fieldCode,
            width: 0,
            isEditable: true,
            joinConditionId: null,
            displayName: null,
            nowrap: false,
            maxHeight: null,
          },
        ]);
      }
    },
    [appFields, setVisibleFields]
  );

  const handleRemoveField = useCallback(
    (fieldId: string) => {
      setVisibleFields((fields) => fields.filter((field) => field.id !== fieldId));
    },
    [setVisibleFields]
  );

  // 利用可能なフィールドのリスト（まだ選択されていないもの）
  const availableFields = useMemo(
    () =>
      Object.keys(appFields ?? {}).filter((fieldCode) => {
        const field = appFields?.[fieldCode];
        const isVisible = visibleFields.some((vf) => vf.fieldCode === fieldCode);
        // サブテーブルと関連レコードを除外、かつまだ選択されていないもの
        return field && field.type !== 'SUBTABLE' && field.type !== 'REFERENCE_TABLE' && !isVisible;
      }),
    [appFields, visibleFields]
  );

  const sortableIds = useMemo(() => visibleFields.map((f) => f.id), [visibleFields]);

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>
        表示フィールド設定
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          表示するフィールドを選択し、ドラッグして並び替えができます
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Section>
          <SectionTitle variant='subtitle1'>
            表示中のフィールド
            <Chip label={visibleFields.length} size='small' color='primary' />
          </SectionTitle>
          {visibleFields.length === 0 ? (
            <EmptyState>
              フィールドが選択されていません
              <br />
              下から追加してください
            </EmptyState>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
                {visibleFields.map((field) => {
                  const fieldProperty = appFields?.[field.fieldCode];
                  return (
                    <SortableItem
                      key={field.id}
                      id={field.id}
                      fieldCode={field.fieldCode}
                      label={fieldProperty?.label ?? field.fieldCode}
                      onRemove={() => handleRemoveField(field.id)}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
          )}
        </Section>

        <Section>
          <SectionTitle variant='subtitle1'>
            追加可能なフィールド
            <Chip label={availableFields.length} size='small' />
          </SectionTitle>
          {availableFields.length === 0 ? (
            <EmptyState>追加可能なフィールドはありません</EmptyState>
          ) : (
            <AvailableFieldsGrid>
              {availableFields.map((fieldCode) => {
                const field = appFields?.[fieldCode];

                return (
                  <AvailableFieldCard key={fieldCode} elevation={0}>
                    <AvailableFieldInfo>
                      <FieldLabel>{field?.label ?? fieldCode}</FieldLabel>
                      <FieldCode>{fieldCode}</FieldCode>
                    </AvailableFieldInfo>
                    <AddButton
                      size='small'
                      variant='outlined'
                      startIcon={<AddIcon />}
                      onClick={() => handleAddField(fieldCode)}
                      fullWidth
                    >
                      追加
                    </AddButton>
                  </AvailableFieldCard>
                );
              })}
            </AvailableFieldsGrid>
          )}
        </Section>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained'>
          閉じる
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default FieldSettingsDialog;
