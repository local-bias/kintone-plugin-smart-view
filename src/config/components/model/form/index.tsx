import React, { FC, FCX } from 'react';
import styled from '@emotion/styled';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';
import ViewIdForm from './form-view-id';
import ImportingViewFields from './importing-view-fields';
import ViewDisplayingFieldsForm from './form-view-fields';
import PaginationChunkForm from './form-pagination-chunk';
import PaginationControlForm from './form-pagination-control';
import CSVExportForm from './form-csv-export';
import EditableModeForm from './form-editable';
import SortableModeForm from './form-sortable';
import LetterCaseForm from './form-letter-case';
import KatakanaForm from './form-katakana';
import ZenkakuEisujiForm from './form-zenkaku-eisuji';
import HankakuKatakanaForm from './form-hankaku-katakana';
import CursorAPIForm from './form-cursor-api';
import DeletionButton from './condition-deletion-button';
import OpenDetailInNewTabForm from './form-new-tab';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <PluginFormSection>
        <PluginFormTitle>テーブルを表示する一覧の設定</PluginFormTitle>
        <PluginFormDescription>検索機能を実装する一覧を選択してください。</PluginFormDescription>
        <PluginFormDescription>
          選択できる一覧は表示形式「カスタマイズ」のみです。
        </PluginFormDescription>
        <PluginFormDescription last>
          この設定を変更するには、システム管理権限が必要です。
        </PluginFormDescription>
        <ViewIdForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>テーブルに表示するフィールドの設定</PluginFormTitle>
        <PluginFormDescription>一覧に表示するフィールドを設定します。</PluginFormDescription>
        <PluginFormDescription last>
          検索フォームに入力された値が検索対象とするのは、この設定で選択したフィールドのみです。
        </PluginFormDescription>
        <div className='quick-import-buttons'>
          <ImportingViewFields />
        </div>

        <ViewDisplayingFieldsForm />
      </PluginFormSection>

      <PluginFormSection>
        <PluginFormTitle>ページネーションの設定</PluginFormTitle>
        <PluginFormDescription>
          1ページあたりの表示レコード数を変更することができます。
        </PluginFormDescription>
        <PluginFormDescription last>
          スペックの低い環境では、表示レコード数を減らすことで動作が軽くなる場合があります。
        </PluginFormDescription>
        <div style={{ marginBottom: '16px' }}>
          <PaginationChunkForm />
        </div>
        <PluginFormDescription last>
          この設定を有効にした場合、1ページあたりの表示レコード数を変更することのできるフォームが表示されます。
        </PluginFormDescription>
        <PaginationControlForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>並び替えの設定</PluginFormTitle>
        <PluginFormDescription>
          この設定を有効にした場合、一覧のヘッダーをクリックすることで、レコードを昇順・降順にソートすることができます。
        </PluginFormDescription>
        <SortableModeForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>CSVエクスポートの設定</PluginFormTitle>
        <PluginFormDescription>
          この設定を有効にした場合、一覧にCSVエクスポートボタンが表示されます。
        </PluginFormDescription>
        <PluginFormDescription>
          エクスポートされる一覧は、検索フォームに入力された値によって絞り込まれます。
        </PluginFormDescription>
        <PluginFormDescription>
          kintone標準のCSVエクスポート機能と互換性がない点に注意してください。
        </PluginFormDescription>
        <CSVExportForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>編集機能の設定</PluginFormTitle>
        <EditableModeForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>高度なオプション</PluginFormTitle>
        <div className='advanced-options'>
          <OpenDetailInNewTabForm />
          <LetterCaseForm />
          <KatakanaForm />
          <HankakuKatakanaForm />
          <ZenkakuEisujiForm />
          <CursorAPIForm />
        </div>
        <small>カーソルAPIを無効にした場合、一覧のソート条件は適用されません</small>
      </PluginFormSection>
      <div>
        <DeletionButton />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  > div {
    padding: 8px 8px 8px 16px;
    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }

  .quick-import-buttons {
    display: flex;
    margin: 16px 0 24px;
    gap: 16px;
  }

  .advanced-options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export default StyledComponent;
