// /* ==========================================================================
// PendingRequestsTableHeaders.vue This component is the table for displaying
// pending transportation exception requests.
// ========================================================================== */
// <script setup lang="ts">
// import { useI18n } from 'vue-i18n';
// import { useRequestStore } from '@/stores';
// import { Button } from 'dps-component-library';

// const { t } = useI18n();
// const store = useRequestStore();

// // Column headers for the table
// const columnHeaders = {
//   studentID: t('content.views.pendingRequests.columnHeaders.studentID'),
//   studentName: t('content.views.pendingRequests.columnHeaders.studentName'),
//   schoolName: t('content.views.pendingRequests.columnHeaders.schoolName'),
//   applicationDate: t(
//     'content.views.pendingRequests.columnHeaders.applicationDate'
//   ),
//   assignedRouter: t(
//     'content.views.pendingRequests.columnHeaders.assignedRouter'
//   ),
//   daysPending: t('content.views.pendingRequests.columnHeaders.daysPending'),
// };

// /**
//  * @description - Determines the sort icon to display
//  *
//  * @param {string} header - The header to sort by
//  */
// const sortClassActive = (header: string) => {
//   if (store.filterState.sortBy === header) {
//     if (store.filterState.sortAscDsc === 'dsc') {
//       return ['fas', 'fa-caret-down'];
//     } else {
//       return ['fas', 'fa-caret-up'];
//     }
//   }
//   return ['fas', 'fa-sort'];
// };
// </script>

// /* Template ============================================================== */
// <template>
//   <thead id="transportation-exception-admin__pending-requests-table-thead">
//     <tr
//       id="transportation-exception-admin__pending-requests-table-headers-container"
//       class="dps-p-2"
//     >
//       <th
//         id="transportation-exception-admin__pending-table-header-student-id"
//         class="table-header"
//       >
//         {{ columnHeaders.studentID }}
//         <Button
//           class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2 dps-w-fit-content"
//           :title="`sort${columnHeaders.studentID}`"
//           :aria-label="`sort${columnHeaders.studentID}`"
//           @click="store.sortController('studentID', 'number')"
//         >
//           <font-awesome-icon
//             id="transportation-exception-admin__pending-requests-table-headers-icon-student-id"
//             :icon="sortClassActive('studentID')"
//           />
//         </Button>
//       </th>
//       <th
//         id="transportation-exception-admin__pending-table-header-student-name"
//         class="table-header"
//       >
//         {{ columnHeaders.studentName }}
//         <Button
//           class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2"
//           :title="`sort${columnHeaders.studentName}`"
//           :aria-label="`sort${columnHeaders.studentName}`"
//           @click="store.sortController('studentName', 'string')"
//         >
//           <font-awesome-icon
//             id="transportation-exception-admin__pending-requests-table-headers-icon-student-name"
//             :icon="sortClassActive('studentName')"
//           />
//         </Button>
//       </th>
//       <th
//         id="transportation-exception-admin__pending-table-header-school-name"
//         class="table-header"
//       >
//         {{ columnHeaders.schoolName }}
//         <Button
//           class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2"
//           :title="`sort${columnHeaders.schoolName}`"
//           :aria-label="`sort${columnHeaders.schoolName}`"
//           @click="store.sortController('school', 'string')"
//         >
//           <font-awesome-icon
//             id="transportation-exception-admin__pending-requests-table-headers-icon-school-name"
//             :icon="sortClassActive('school')"
//           />
//         </Button>
//       </th>
//       <th
//         id="transportation-exception-admin__pending-table-header-application-date"
//         class="table-header"
//       >
//         {{ columnHeaders.applicationDate }}
//         <Button
//           class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2"
//           :title="`sort${columnHeaders.applicationDate}`"
//           :aria-label="`sort${columnHeaders.applicationDate}`"
//           @click="store.sortController('applicationDate', 'date')"
//         >
//           <font-awesome-icon
//             id="transportation-exception-admin__pending-requests-table-headers-icon-application-date"
//             :icon="sortClassActive('applicationDate')"
//           />
//         </Button>
//       </th>
//       <th
//         id="transportation-exception-admin__pending-table-header-assigned-router"
//         class="table-header"
//       >
//         {{ columnHeaders.assignedRouter }}
//         <Button
//           class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2"
//           :title="`sort${columnHeaders.assignedRouter}`"
//           :aria-label="`sort${columnHeaders.assignedRouter}`"
//           @click="store.sortController('assignedRouter', 'string')"
//         >
//           <font-awesome-icon
//             id="transportation-exception-admin__pending-requests-table-headers-icon-assigned-router"
//             :icon="sortClassActive('assignedRouter')"
//           />
//         </Button>
//       </th>
//       <th
//         id="transportation-exception-admin__pending-table-header-days-pending"
//         class="table-header"
//       >
//         <div>
//           {{ columnHeaders.daysPending }}
//           <Button
//             class="transportation-exception-admin__table-sort-btn icon-button dps-bg-transparent dps-ml-2"
//             :title="`sort${columnHeaders.daysPending}`"
//             :aria-label="`sort${columnHeaders.daysPending}`"
//             @click="store.sortController('daysPending', 'number')"
//           >
//             <font-awesome-icon :icon="sortClassActive('daysPending')" />
//           </Button>
//         </div>
//       </th>
//     </tr>
//   </thead>
// </template>

// /* Styles ================================================================ */
// <style lang="postcss">
// #transportation-exception-admin__pending-requests-table-thead {
//   .icon-button {
//     padding: 0;
//   }
// }
// </style>
