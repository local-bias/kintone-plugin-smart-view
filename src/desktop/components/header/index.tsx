import React, { VFC } from 'react';

import Layout from './layout';
import SearchInput from './search-input';
import Pagination from './pagination';

const Component: VFC = () => (
  <Layout>
    <SearchInput />
    <Pagination />
  </Layout>
);

export default Component;
