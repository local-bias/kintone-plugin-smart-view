import React, { FC } from 'react';

import Layout from './layout';
import SearchInput from './search-input';
import CSVDownloadButton from './csv-download-button';
import Pagination from './pagination';
import PaginationChunk from './pagination-chunk';
import ExtractedInputs from './extracted-inputs';
import ViewTypeSelect from './view-type-select';
import { useAtomValue } from 'jotai';
import { pluginConditionAtom } from '@/desktop/states/plugin';

const Component: FC = () => {
  const condition = useAtomValue(pluginConditionAtom)!;

  return (
    <Layout condition={condition}>
      <div className='flex flex-wrap gap-4 items-center'>
        <SearchInput />
        <ExtractedInputs />
      </div>
      <div>
        <CSVDownloadButton />
        <ViewTypeSelect />
        <Pagination />
        <PaginationChunk />
      </div>
    </Layout>
  );
};

export default Component;
