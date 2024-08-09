import React, { FC } from 'react';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import ViewIdForm from './form-view-id';
import ImportingViewFields from './importing-view-fields';
import ViewDisplayingFieldsForm from './form-view-fields';
import PaginationChunkForm from './form-pagination-chunk';
import DeletionButton from './condition-deletion-button';
import { getConditionPropertyState } from '@/config/states/plugin';
import ExtractedInputsForm from './form-extracted-inputs';
import CreateViewButton from './create-view-button';
import { Tooltip } from '@mui/material';
import ViewTypeForm from './form-view-type';
import JoinConditionForm from './form-join-condition';

const Component: FC = () => {
  return (
    <div className='p-4'>
      <PluginFormSection>
        <PluginFormTitle>テーブルを表示する一覧の設定</PluginFormTitle>
        <PluginFormDescription>検索機能を実装する一覧を選択してください。</PluginFormDescription>
        <PluginFormDescription>
          選択できる一覧は表示形式「カスタマイズ」のみです。
        </PluginFormDescription>
        <PluginFormDescription last>
          この設定を変更するには、システム管理権限が必要です。
        </PluginFormDescription>
        <div className='flex items-center gap-8'>
          <ViewIdForm />
          <CreateViewButton />
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>テーブルに表示するフィールドの設定</PluginFormTitle>
        <PluginFormDescription>一覧に表示するフィールドを設定します。</PluginFormDescription>
        <PluginFormDescription>
          検索フォームに入力された値が検索対象とするのは、この設定で選択したフィールドのみです。
        </PluginFormDescription>
        <PluginFormDescription>
          ヘッダーの文字幅を下回る表示幅を指定した場合、表示が見切れてしまう可能性があります。
        </PluginFormDescription>
        <PluginFormDescription last>
          表示幅を0に設定した場合、幅は内容に合わせて自動調整されます。
        </PluginFormDescription>
        <div className='flex mt-4 mb-6 gap-4'>
          <ImportingViewFields />
        </div>
        <ViewDisplayingFieldsForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>表示タイプの設定</PluginFormTitle>
        <PluginFormDescription>
          レコードをどのような形式で表示するかを設定します。
        </PluginFormDescription>
        <PluginFormDescription last>
          カードタイプを選択した場合、表示するフィールドの中から最初の添付ファイルフィールドが画像用に参照されます。
        </PluginFormDescription>
        <div className='mb-4'>
          <ViewTypeForm />
        </div>
        <PluginFormDescription last>
          この設定を有効にした場合、一覧の表示タイプを変更することのできるフォームが表示されます。
        </PluginFormDescription>
        <RecoilSwitch
          state={getConditionPropertyState('isViewTypeControlEnabled')}
          label='一覧から表示タイプを変更可能にする'
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>ページネーションの設定</PluginFormTitle>
        <PluginFormDescription>
          1ページあたりの表示レコード数を変更することができます。
        </PluginFormDescription>
        <PluginFormDescription last>
          スペックの低い環境では、表示レコード数を減らすことで動作が軽くなる場合があります。
        </PluginFormDescription>
        <div className='mb-4'>
          <PaginationChunkForm />
        </div>
        <PluginFormDescription last>
          この設定を有効にした場合、1ページあたりの表示レコード数を変更することのできるフォームが表示されます。
        </PluginFormDescription>
        <RecoilSwitch
          state={getConditionPropertyState('isPaginationChunkControlShown')}
          label='一覧から表示件数を変更可能にする'
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>一覧のソート条件の設定</PluginFormTitle>
        <PluginFormDescription>
          対象の一覧に設定したソート条件を、プラグインの一覧にも適用するかを設定します。
        </PluginFormDescription>
        <PluginFormDescription last>
          この設定を無効にした場合。プラグインの一覧は必ず新しいレコードから表示されます。
        </PluginFormDescription>
        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <RecoilSwitch
              state={getConditionPropertyState('isViewSortConditionEnabled')}
              label='一覧のソート条件を有効にする'
              disabled
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>並び替えの設定</PluginFormTitle>
        <PluginFormDescription>
          この設定を有効にした場合、一覧のヘッダーをクリックすることで、レコードを昇順・降順にソートすることができます。
        </PluginFormDescription>
        <PluginFormDescription last>
          フィールドタイプによっては、並び替えができない場合があります。
        </PluginFormDescription>
        <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
          <div>
            <RecoilSwitch
              state={getConditionPropertyState('isSortable')}
              label='並び替えを有効にする'
              disabled
            />
          </div>
        </Tooltip>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>CSVエクスポートの設定</PluginFormTitle>
        <PluginFormDescription>
          この設定を有効にした場合、一覧にCSVエクスポートボタンが表示されます。
        </PluginFormDescription>
        <PluginFormDescription>
          エクスポートされる一覧は、検索フォームに入力された値によって絞り込まれます。
        </PluginFormDescription>
        <PluginFormDescription last>
          kintone標準のCSVエクスポート機能と互換性がない点に注意してください。
        </PluginFormDescription>
        <RecoilSwitch
          state={getConditionPropertyState('isCsvDownloadButtonHidden')}
          label='CSV出力機能を無効にする'
        />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>編集機能の設定</PluginFormTitle>
        <PluginFormDescription>
          一部のフィールドを除き、一覧からレコードの各フィールドを編集できるようになります。
        </PluginFormDescription>
        <PluginFormDescription last>
          編集できるのは、レコードに対して編集権限を持つユーザーのみです。
        </PluginFormDescription>
        <div>
          <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
            <div>
              <div>
                <RecoilSwitch
                  state={getConditionPropertyState('isEditable')}
                  label='一覧での編集を有効にする'
                  disabled
                />
              </div>
              <div>
                <RecoilSwitch
                  state={getConditionPropertyState('isEditorControlEnabled')}
                  label='編集できるユーザーを制限する'
                  disabled
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>削除機能の設定</PluginFormTitle>
        <PluginFormDescription>一覧からレコードを削除できるようになります。</PluginFormDescription>
        <PluginFormDescription last>
          削除できるのは、レコードに対して削除権限を持つユーザーのみです。
        </PluginFormDescription>
        <div>
          <Tooltip title='この機能は一覧高速検索プラグイン プラスでのみご利用いただけます'>
            <div>
              <div>
                <RecoilSwitch
                  state={getConditionPropertyState('isDeletable')}
                  label='一覧での削除を有効にする'
                  disabled={true}
                />
              </div>
              <div>
                <RecoilSwitch
                  state={getConditionPropertyState('isDeleterControlEnabled')}
                  label='削除できるユーザーを制限する'
                  disabled={true}
                />
              </div>
            </div>
          </Tooltip>
        </div>
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>追加の検索フィールド</PluginFormTitle>
        <PluginFormDescription last>
          プラグイン標準の全フィールドを対象とした検索フォームに加えて、特定のフィールドのみを対象とする検索フィールドを追加したい場合は、こちらで設定してください。
        </PluginFormDescription>
        <ExtractedInputsForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>高度なオプション</PluginFormTitle>
        <PluginFormSection>
          <PluginFormTitle>あいまい検索の設定</PluginFormTitle>
          <div className='flex flex-col items-start'>
            <RecoilSwitch
              state={getConditionPropertyState('isOpenInNewTab')}
              label='レコードの詳細画面を新しいタブで開く'
            />
            <RecoilSwitch
              state={getConditionPropertyState('isCaseSensitive')}
              label='絞り込みの際、アルファベットの大文字と小文字を区別する'
            />
            <RecoilSwitch
              state={getConditionPropertyState('isKatakanaSensitive')}
              label='絞り込みの際、カタカナとひらがなを区別する'
            />
            <RecoilSwitch
              state={getConditionPropertyState('isHankakuKatakanaSensitive')}
              label='絞り込みの際、半角カナと全角カナを区別する'
            />
            <RecoilSwitch
              state={getConditionPropertyState('isZenkakuEisujiSensitive')}
              label='絞り込みの際、全角英数字と半角英数字を区別する'
            />
          </div>
        </PluginFormSection>
        <PluginFormSection>
          <PluginFormTitle>他アプリとの結合設定</PluginFormTitle>
          <PluginFormDescription>
            特定のキーを基準に、他のアプリのレコードを参照することができます。結合設定を有効にすると、「テーブルに表示するフィールドの設定」で結合したアプリのフィールドを追加することができます。
          </PluginFormDescription>
          <PluginFormDescription last>
            現在のバージョンでは、各レコードについてキー情報に一致した最初のレコードが参照されます。
          </PluginFormDescription>
          <JoinConditionForm />
        </PluginFormSection>
      </PluginFormSection>
      <div>
        <DeletionButton />
      </div>
    </div>
  );
};

export default Component;
