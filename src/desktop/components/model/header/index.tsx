import React, { FC } from 'react';

import Layout from './layout';
import SearchInput from './search-input';
import CSVDownloadButton from './csv-download-button';
import Pagination from './pagination';
import PaginationChunk from './pagination-chunk';
import ExtractedInputs from './extracted-inputs';
import ViewTypeSelect from './view-type-select';

const Component: FC = () => (
  <Layout>
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

export default Component;
