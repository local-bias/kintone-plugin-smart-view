import {
  cardImageFieldCodeState,
  cardViewFieldsState,
  pluginConditionState,
} from '@/desktop/states/plugin';
import { isMobile, kintoneAPI } from '@konomi-app/kintone-utilities';
import React, { FC, FCX } from 'react';
import { useRecoilValue } from 'recoil';
import Image from './image';
import styled from '@emotion/styled';
import Field from './field';
import { getQueryString } from '@/lib/cybozu';
import { DocumentIcon } from '../../ui/document-icon';
import { Card, IconButton, Tooltip } from '@mui/material';

type FileInfo = kintoneAPI.field.File['value'][number];

type Props = {
  record: kintoneAPI.RecordData;
};

const Component: FCX<Props> = ({ className, record }) => {
  const condition = useRecoilValue(pluginConditionState)!;
  const imageFieldCode = useRecoilValue(cardImageFieldCodeState);
  const viewFields = useRecoilValue(cardViewFieldsState) ?? [];

  const files = imageFieldCode ? (record[imageFieldCode]?.value as FileInfo[]) ?? [] : [];

  let image: FileInfo | null = null;

  for (const file of files) {
    if (/^image\//.test(file.contentType)) {
      image = file;
      break;
    }
  }

  return (
    <Card className={className}>
      <Image file={image} />
      <div className='🐸right'>
        <div className='🐸fields'>
          {viewFields.map((field, i) => {
            return <Field key={i} field={record[field.fieldCode]} fieldCode={field.fieldCode} />;
          })}
        </div>
        <div className='🐸actions'>
          <a
            href={`${location.pathname}show${isMobile() ? '?' : '#'}record=${
              record.$id.value
            }&l.view=${condition.viewId}&l.q${getQueryString() ? `=${getQueryString()}` : ''}`}
            {...(condition.isOpenInNewTab ? { target: '_blank' } : {})}
          >
            <Tooltip title='レコード詳細'>
              <IconButton>
                <DocumentIcon />
              </IconButton>
            </Tooltip>
          </a>
        </div>
      </div>
    </Card>
  );
};

const Container: FC<Props> = (props) => {
  return <Component {...props} />;
};

const StyledContainer: FC<Props> = styled(Container)`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100%;

  .🐸right {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 16px;
    padding: 16px;
  }

  .🐸fields {
    display: grid;
    gap: 8px;
  }

  .🐸actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
`;

export default StyledContainer;
