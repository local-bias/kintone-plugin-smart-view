import { FC } from 'react';

import CSVDownloadButton from './csv-download-button';
import ExtractedInputs from './extracted-inputs';
import Layout from './layout';
import Pagination from './pagination';
import PaginationChunk from './pagination-chunk';
import SearchInput from './search-input';
import ViewTypeSelect from './view-type-select';

const Component: FC = () => {
  return (
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
};

export default Component;
