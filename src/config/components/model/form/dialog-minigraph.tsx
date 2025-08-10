import { appFieldsAtom } from '@/config/states/app-fields';
import {
  selectedConditionAtom,
  selectedViewFieldDetailSettingIndexAtom,
} from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { kintoneAPI } from '@konomi-app/kintone-utilities';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import { FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { produce } from 'immer';
import { useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { Suspense, useCallback } from 'react';

const GRAPH_TYPES = [
  // { value: 'bar', label: t('config.app.form.view-fields.minigraph.graphType.bar') },
  { value: 'stackedBar', label: t('config.app.form.view-fields.minigraph.graphType.stackedBar') },
  { value: 'pie', label: t('config.app.form.view-fields.minigraph.graphType.pie') },
] as const;

type GraphType = (typeof GRAPH_TYPES)[number]['value'];

function MinigraphForm({ property }: { property: kintoneAPI.property.Subtable }) {
  const selectedIndex = useAtomValue(selectedViewFieldDetailSettingIndexAtom);
  const condition = useAtomValue(selectedConditionAtom);
  const viewField = selectedIndex !== null ? condition.viewFields[selectedIndex] : null;

  const valueSelectableFields = Object.values(property.fields).filter(
    (field) => field.type === 'NUMBER' || field.type === 'CALC'
  );

  const index = selectedIndex ?? 0;

  const onMiniGraphEnabledChange = useAtomCallback(
    useCallback((_, set, index: number, value: boolean) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].isMiniGraphEnabled = value;
        })
      );
    }, [])
  );

  const onMiniGraphTypeChange = useAtomCallback(
    useCallback((_, set, index: number, value: string) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].miniGraphType = value as GraphType;
        })
      );
    }, [])
  );

  const onMiniGraphValueFieldCodeChange = useAtomCallback(
    useCallback((_, set, index: number, value: string) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].miniGraphValueFieldCode = value;
        })
      );
    }, [])
  );

  const onMiniGraphLabelFieldCodeChange = useAtomCallback(
    useCallback((_, set, index: number, value: string) => {
      set(selectedConditionAtom, (prev) =>
        produce(prev, (draft) => {
          draft.viewFields[index].miniGraphLabelFieldCode = value;
        })
      );
    }, [])
  );

  return (
    <PluginFormSection>
      <PluginFormTitle>{t('config.app.form.view-fields.minigraph.title')}</PluginFormTitle>
      <PluginFormDescription last>
        {t('config.app.form.view-fields.minigraph.description')}
      </PluginFormDescription>
      <FormControlLabel
        control={
          <Switch
            checked={viewField?.isMiniGraphEnabled ?? false}
            onChange={(_, checked) => onMiniGraphEnabledChange(index, checked)}
          />
        }
        label={t('config.app.form.view-fields.minigraph.label')}
      />
      {viewField?.isMiniGraphEnabled && (
        <div className='grid gap-4'>
          <TextField
            select
            label={t('config.app.form.view-fields.minigraph.graphType.label')}
            value={viewField?.miniGraphType ?? ''}
            fullWidth
            onChange={(e) => onMiniGraphTypeChange(index, e.target.value)}
          >
            {GRAPH_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={t('config.app.form.view-fields.minigraph.valueField.label')}
            fullWidth
            value={viewField?.miniGraphValueFieldCode ?? ''}
            onChange={(e) => onMiniGraphValueFieldCodeChange(index, e.target.value)}
          >
            {valueSelectableFields.map((field) => (
              <MenuItem key={field.code} value={field.code}>
                {field.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={t('config.app.form.view-fields.minigraph.labelField.label')}
            fullWidth
            value={viewField?.miniGraphLabelFieldCode ?? ''}
            onChange={(e) => onMiniGraphLabelFieldCodeChange(index, e.target.value)}
          >
            {Object.values(property.fields).map((field) => (
              <MenuItem key={field.code} value={field.code}>
                {field.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </PluginFormSection>
  );
}

function MinigraphFormContainer() {
  const selectedIndex = useAtomValue(selectedViewFieldDetailSettingIndexAtom);
  const condition = useAtomValue(selectedConditionAtom);
  const viewField = selectedIndex !== null ? condition.viewFields[selectedIndex] : null;
  const properties = useAtomValue(appFieldsAtom);
  const property = properties.find((p) => p.code === viewField?.fieldCode);

  if (property?.type !== 'SUBTABLE') {
    return null;
  }

  return <MinigraphForm property={property} />;
}

export default function ViewFieldDetailDialogMinigraphForm() {
  return (
    <Suspense fallback={null}>
      <MinigraphFormContainer />
    </Suspense>
  );
}
