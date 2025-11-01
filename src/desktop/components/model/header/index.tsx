import { FC } from 'react';

import CSVDownloadButton from './csv-download-button';
import ExtractedInputs from './extracted-inputs';
import FieldSettingsButton from './field-settings-button';
import Layout from './layout';
import Pagination from './pagination';
import PaginationChunk from './pagination-chunk';
import SearchInput from './search-input';
import ViewTypeSelect from './view-type-select';

const Component: FC = () => {
  return (
    <Layout>
      <div className='rad:flex rad:flex-wrap rad:gap-4 rad:items-center'>
        <SearchInput />
        <ExtractedInputs />
      </div>
      <div>
        <FieldSettingsButton />
        <CSVDownloadButton />
        <ViewTypeSelect />
        <Pagination />
        <PaginationChunk />
      </div>
    </Layout>
  );
};

export default Component;
