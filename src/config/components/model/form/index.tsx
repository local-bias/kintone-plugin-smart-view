import { getConditionPropertyAtom } from '@/config/states/plugin';
import { t } from '@/lib/i18n';
import { JotaiSwitch } from '@konomi-app/kintone-utilities-jotai';
import {
  PluginFormDescription,
  PluginFormSection,
  PluginFormTitle,
} from '@konomi-app/kintone-utilities-react';
import { Tooltip } from '@mui/material';
import { FC } from 'react';
import DeletionButton from './condition-deletion-button';
import CreateViewButton from './create-view-button';
import ExtractedInputsForm from './form-extracted-inputs';
import JoinConditionForm from './form-join-condition';
import PaginationChunkForm from './form-pagination-chunk';
import ViewDisplayingFieldsForm from './form-view-fields';
import ViewIdForm from './form-view-id';
import ViewIdFormError from './form-view-id-error';
import ViewTypeForm from './form-view-type';
import ImportingViewFields from './importing-view-fields';

const Component: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.view-id.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.view-id.description.1')}
        </PluginFormDescription>
        <div className='flex items-center gap-8'>
          <ViewIdForm />
          <CreateViewButton />
        </div>
        <ViewIdFormError />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.view-fields.title')}</PluginFormTitle>
        <PluginFormDescription>
          {t('config.app.form.view-fields.description.1')}
        </PluginFormDescription>
        <PluginFormDescription last>
          {t('config.app.form.view-fields.description.2')}
        </PluginFormDescription>
        <div className='flex mt-4 mb-6 gap-4'>
          <ImportingViewFields />
        </div>
        <ViewDisplayingFieldsForm />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.joinConditions.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.joinConditions.description')}
        </PluginFormDescription>
        <JoinConditionForm />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.view-type.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.view-type.description.1')}
        </PluginFormDescription>
        <div className='mb-4'>
          <ViewTypeForm />
        </div>
        <PluginFormDescription last>
          {t('config.app.form.isViewTypeControlEnabled.description')}
        </PluginFormDescription>
        <JotaiSwitch
          atom={getConditionPropertyAtom('isViewTypeControlEnabled')}
          label={t('config.app.form.isViewTypeControlEnabled.label')}
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.pagination.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.pagination.description.1')}
        </PluginFormDescription>
        <div className='mb-4'>
          <PaginationChunkForm />
        </div>
        <PluginFormDescription last>
          {t('config.app.form.isPaginationChunkControlShown.description')}
        </PluginFormDescription>
        <JotaiSwitch
          atom={getConditionPropertyAtom('isPaginationChunkControlShown')}
          label={t('config.app.form.isPaginationChunkControlShown.label')}
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.sortCriteria.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.isViewSortConditionEnabled.description')}
        </PluginFormDescription>

        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <JotaiSwitch
              disabled={true}
              atom={getConditionPropertyAtom('isViewSortConditionEnabled')}
              label={t('config.app.form.isViewSortConditionEnabled.label')}
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.isSortable.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.isSortable.description')}
        </PluginFormDescription>
        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <JotaiSwitch
              disabled={true}
              atom={getConditionPropertyAtom('isSortable')}
              label={t('config.app.form.isSortable.label')}
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.csvExport.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.csvExport.description')}
        </PluginFormDescription>
        <JotaiSwitch
          atom={getConditionPropertyAtom('isCsvDownloadButtonHidden')}
          label={t('config.app.form.isCsvDownloadButtonHidden.label')}
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.editFeatures.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.isEditable.description')}
        </PluginFormDescription>
        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <JotaiSwitch
              disabled={true}
              atom={getConditionPropertyAtom('isEditable')}
              label={t('config.app.form.isEditable.label')}
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.deleteFeatures.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.isDeletable.description')}
        </PluginFormDescription>
        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <JotaiSwitch
              atom={getConditionPropertyAtom('isDeletable')}
              disabled={true}
              label={t('config.app.form.isDeletable.label')}
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.extractedInputs.title')}</PluginFormTitle>
        <PluginFormDescription last>
          {t('config.app.form.extractedInputs.description')}
        </PluginFormDescription>
        <ExtractedInputsForm />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>{t('config.app.form.advancedSettings.title')}</PluginFormTitle>
        <div className='px-4 py-2 ml-4 mt-2 border-l'>
          <PluginFormSection>
            <h3 className='text-base font-bold'>{t('config.app.form.fuzzySearch.title')}</h3>
            <div className='flex flex-col items-start'>
              <JotaiSwitch
                atom={getConditionPropertyAtom('isCaseSensitive')}
                label={t('config.app.form.isCaseSensitive.label')}
              />
              <JotaiSwitch
                atom={getConditionPropertyAtom('isKatakanaSensitive')}
                label={t('config.app.form.isKatakanaSensitive.label')}
              />
              <JotaiSwitch
                atom={getConditionPropertyAtom('isHankakuKatakanaSensitive')}
                label={t('config.app.form.isHankakuKatakanaSensitive.label')}
              />
              <JotaiSwitch
                atom={getConditionPropertyAtom('isZenkakuEisujiSensitive')}
                label={t('config.app.form.isZenkakuEisujiSensitive.label')}
              />
            </div>
          </PluginFormSection>
        </div>

        <div className='px-4 py-2 ml-4 mt-2 border-l'>
          <PluginFormSection>
            <h3 className='text-base font-bold'>{t('config.app.form.pageTransition.title')}</h3>
            <JotaiSwitch
              atom={getConditionPropertyAtom('isOpenInNewTab')}
              label={t('config.app.form.isOpenInNewTab.label')}
            />
          </PluginFormSection>
        </div>
      </PluginFormSection>
      <div>
        <DeletionButton />
      </div>
    </div>
  );
};

export default Component;
