// /* ==========================================================================
// PendingRequestsTable.vue This component is the table for displaying pending
// transportation exception requests.
// ========================================================================== */
// <script setup lang="ts">
// import { onMounted } from 'vue';
// import { useRequestStore } from '@/stores';
// import PendingRequestsTableItem from '@/components/PendingRequests/PendingRequestsTableItem.vue';
// import PendingRequestsTableHeaders from '@/components/PendingRequests/PendingRequestsTableHeaders.vue';
// import PageCountSelect from '@/components/PendingRequests/FilteringPagination/PageCountSelect.vue';
// import Filter from '@/components/PendingRequests/FilteringPagination/Filter.vue';
// import SearchBar from '@/components/PendingRequests/FilteringPagination/SearchBar.vue';
// import Pagination from '@/components/PendingRequests/FilteringPagination/Pagination.vue';
// import TableLoader from '@/components/Loaders/TableLoader.vue';
// import { NUM } from '@/constants';

// defineOptions({
//   name: 'PendingRequestsTable',
// });
// const store = useRequestStore();

// /**
//  *  @description - Reset filter state to default and fetch pending requests when component is mounted
//  */
// onMounted((): void => {
//   store.filterState = {
//     currentPage: NUM.ONE,
//     currentlyFiltered: false,
//     searchText: '',
//     filterList: [],
//     showFilterDropdown: false,
//     sortAscDsc: 'dsc',
//     sortBy: 'daysPending',
//     displayPerPage: '25',
//     totalPages: NUM.ONE,
//     filteredRecords: [],
//     paginatedFilteredRecords: [],
//   };
//   store.initialLoading = true;
//   store.getPendingRequests();
// });
// </script>

// /* Template ============================================================== */
// <template>
//   <div id="transportation-exception-admin__pending-requests-table-container">
//     <SearchBar />
//     <Filter />
//     <TableLoader
//       v-if="store.initialLoading"
//       :headers="[
//         $t('content.views.pendingRequests.columnHeaders.studentID'),
//         $t('content.views.pendingRequests.columnHeaders.studentName'),
//         $t('content.views.pendingRequests.columnHeaders.schoolName'),
//         $t('content.views.pendingRequests.columnHeaders.applicationDate'),
//         $t('content.views.pendingRequests.columnHeaders.assignedRouter'),
//         $t('content.views.pendingRequests.columnHeaders.daysPending'),
//       ]"
//       :rows="NUM.SIX"
//     />
//     <template v-else>
//       <table
//         id="transportation-exception-admin__pending-requests-table"
//         class="table table-striped table-hover table-bordered"
//       >
//         <PendingRequestsTableHeaders />
//         <PendingRequestsTableItem />
//       </table>
//     </template>
//     <footer
//       class="dps-d-flex dps-justify-space-between dps-my-4"
//       :class="store.error ? 'dps-mt-10' : ''"
//     >
//       <PageCountSelect />
//       <Pagination />
//     </footer>
//   </div>
// </template>
// */Styles ================================================================ */
// <style lang="postcss">
// #transportation-exception-admin__pending-requests-table-container {
//   .transportation-exception-admin__table-loader {
//     margin-top: 0;
//   }
// }
// </style>
