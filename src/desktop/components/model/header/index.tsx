import React, { FC } from 'react';

import Layout from './layout';
import SearchInput from './search-input';
import CSVDownloadButton from './csv-download-button';
import Pagination from './pagination';
import PaginationChunk from './pagination-chunk';

const Component: FC = () => (
  <Layout>
    <div>
      <SearchInput />
    </div>
    <div>
      <CSVDownloadButton />
      <Pagination />
      <PaginationChunk />
    </div>
  </Layout>
);

export default Component;
