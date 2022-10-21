import React, { FC, FCX } from 'react';
import styled from '@emotion/styled';

import ViewIdForm from '../../functional/form-view-id';
import ImportingViewFields from '../importing-view-fields';

import ViewDisplayingFieldsForm from '../../functional/form-view-fields';
import PaginationChunkForm from '../../functional/form-pagination-chunk';
import PaginationControlForm from '../../functional/form-pagination-control';
import CSVExportForm from '../../functional/form-csv-export';
import EditableModeForm from '../../functional/form-editable';
import SortableModeForm from '../../functional/form-sortable';
import LetterCaseForm from '../../functional/form-letter-case';
import KatakanaForm from '../../functional/form-katakana';
import ZenkakuEisujiForm from '../../functional/form-zenkaku-eisuji';
import HankakuKatakanaForm from '../../functional/form-hankaku-katakana';

const Component: FCX = ({ className }) => {
  return (
    <div {...{ className }}>
      <div>
        <h3>テーブルを表示する一覧の設定</h3>
        <ViewIdForm />
        <small>選択する一覧は必ず表示形式を「カスタマイズ」に設定してください。</small>
        <small>対象の一覧が選択肢に存在しない場合は、一度アプリを更新してください。</small>
      </div>
      <div>
        <div className='titleWithButton'>
          <h3>テーブルに表示するフィールドの設定</h3>
          <ImportingViewFields />
        </div>
        <ViewDisplayingFieldsForm />
      </div>

      <div>
        <h3>ページネーションの設定</h3>
        <PaginationControlForm />
        <PaginationChunkForm />
      </div>
      <div>
        <h3>その他のオプション</h3>
        <CSVExportForm />
        <EditableModeForm />
        <SortableModeForm />
        <LetterCaseForm />
        <KatakanaForm />
        <HankakuKatakanaForm />
        <ZenkakuEisujiForm />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > div {
    border-left: 4px solid #0002;
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

  h3 {
    font-weight: 600;
    color: #0008;
    margin: 0 0 12px;
    padding-left: 12px;
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
  return <StyledComponent />;
};

export default Container;
