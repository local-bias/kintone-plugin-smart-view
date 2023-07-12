import React, { FC, FCX } from 'react';
import styled from '@emotion/styled';
import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
} from '@konomi-app/kintone-utility-component';

import ViewIdForm from '../../../functional/form-view-id';
import ImportingViewFields from '../importing-view-fields';

import ViewDisplayingFieldsForm from '../../../functional/form-view-fields';
import PaginationChunkForm from '../../../functional/form-pagination-chunk';
import PaginationControlForm from '../../../functional/form-pagination-control';
import CSVExportForm from '../../../functional/form-csv-export';
import EditableModeForm from '../../../functional/form-editable';
import SortableModeForm from '../../../functional/form-sortable';
import LetterCaseForm from '../../../functional/form-letter-case';
import KatakanaForm from '../../../functional/form-katakana';
import ZenkakuEisujiForm from '../../../functional/form-zenkaku-eisuji';
import HankakuKatakanaForm from '../../../functional/form-hankaku-katakana';
import CursorAPIForm from '../../../functional/form-cursor-api';
import { useConditionIndex } from '../../../condition-index-provider';
import { useRecoilValue } from 'recoil';
import { tabIndexState } from '../../../../states/plugin';
import DeletionButton from './condition-deletion-button';
import OpenDetailInNewTabForm from '../../../functional/form-new-tab';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <PluginFormSection>
        <PluginFormTitle>テーブルを表示する一覧の設定</PluginFormTitle>
        <PluginFormDescription>検索機能を実装する一覧を選択してください。</PluginFormDescription>
        <PluginFormDescription last>
          選択できる一覧は表示形式「カスタマイズ」のみです。
        </PluginFormDescription>
        <ViewIdForm />
      </PluginFormSection>
      <PluginFormSection>
        <PluginFormTitle>テーブルに表示するフィールドの設定</PluginFormTitle>
        <PluginFormDescription>一覧に表示するフィールドを設定します。</PluginFormDescription>
        <PluginFormDescription last>
          検索フォームに入力された値が検索対象とするのは、この設定で選択したフィールドのみです。
        </PluginFormDescription>
        <div className='titleWithButton'>
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
        <OpenDetailInNewTabForm />
        <LetterCaseForm />
        <KatakanaForm />
        <HankakuKatakanaForm />
        <ZenkakuEisujiForm />
        <CursorAPIForm />
        <small>カーソルAPIを無効にした場合、一覧のソート条件は適用されません</small>
      </PluginFormSection>
      <div className='top-tools'>
        <DeletionButton />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;

  section {
    > *:not(h3) {
      padding-left: 16px;
    }
    padding: 4px 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  small {
    opacity: 0.7;
    color: #f70;
  }

  h3,
  details summary {
    font-weight: 600;
    color: #334155;
    margin: 0 0 12px;
    padding-left: 12px;
  }

  details summary {
    cursor: pointer;
  }

  .MuiTextField-root {
    min-width: 200px;
  }

  .row {
    display: flex;
    align-items: center;

    &:not(:last-of-type) {
      margin-bottom: 8px;
    }

    > *:not(button) {
      margin: 0 8px;
    }
    > button {
      margin-right: 8px;
    }

    > svg {
      fill: #999;
    }
  }

  .titleWithButton {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    h3 {
      margin: 0;
      padding: 0;
    }

    margin: 0 0 12px;
  }
`;

const Container: FC = () => {
  const conditionIndex = useConditionIndex();
  const tabIndex = useRecoilValue(tabIndexState);
  return conditionIndex === tabIndex ? <StyledComponent /> : null;
};

export default Container;
