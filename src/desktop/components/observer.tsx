// import { getAppId, getQueryCondition } from '@common/kintone';
// import { getAllRecords } from '@common/kintone-rest-api';
// import React, { useEffect, VFC } from 'react';
// import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// import { DeepReadonly } from 'utility-types';

// import { allReceivedRecordsState } from '../states/all-received-records';
// import { displayingRecordsState } from '../states/displaying-records';
// import { filterdRecordsState } from '../states/filterd-records';
// import { paginationChunkState } from '../states/pagination-chunk';
// import { paginationIndexState } from '../states/pagination-index';
// import { searchTextState } from '../states/search-text';

// type ContainerProps = DeepReadonly<{}>;

// const Container: VFC<ContainerProps> = () => {
//   const allRecords = useRecoilValue(allReceivedRecordsState);
//   const setFilterd = useSetRecoilState(filterdRecordsState);
//   const setDisplaying = useSetRecoilState(displayingRecordsState);

//   const refresh = useRecoilCallback(({ snapshot }) => async () => {
//     const records = await snapshot.getPromise(allReceivedRecordsState);
//     const searchText = await snapshot.getPromise(searchTextState);

//     if (!searchText) {
//       setFilterd(records);
//       return;
//     }

//     const filterd = records.filter((record) =>
//       Object.values(record).some(({ value }) => {
//         if (!Array.isArray(value)) {
//           if (!value) {
//             return false;
//           } else if (typeof value === 'string') {
//             return ~value.indexOf(searchText);
//           } else {
//             return ~value.name.indexOf(searchText);
//           }
//         } else {
//           value;
//           return false; // 一旦非対応
//         }
//       })
//     );

//     console.log({ filterd });
//     setFilterd(filterd);

//     const paginationIndex = await snapshot.getPromise(paginationIndexState);
//     const paginationChunk = await snapshot.getPromise(paginationChunkState);

//     setDisplaying(filterd.slice((paginationIndex - 1) * paginationChunk, paginationChunk));
//   });

//   useEffect(() => {
//     refresh();
//   }, [allRecords]);

//   return null;
// };

// export default Container;
