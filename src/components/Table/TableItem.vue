// /* ==========================================================================
// PendingRequestsTableItem.vue This component is the table for displaying pending
// transportation exception requests.
// ========================================================================== */
// <script setup lang="ts">
// import { Button } from '@/components';

// const props = defineProps({
//   tableData: {
//     type: Array,
//     required: true,
//   },
//   errorMessage: {
//     type: String,
//     default: '',
//   },
// });
// </script>

// /* Template ============================================================== */
// <template>
//   <tbody
//     v-if="props.errorMessage === ''"
//     id="transportation-exception-admin__pending-requests-table-item-container"
//   >
//     <tr
//       v-for="(record, index) in props.tableData"
//       :key="index"
//       ref="tableRow"
//       class="transportation-exception-admin__pending-requests-table-row"
//     >
//       <td class="transportation-exception-admin__pending-requests-table-cell">
//         <Button
//           class="transportation-exception-admin__student-id-button dps__blue transportation-exception-admin__pending-requests-student-id-button"
//           @click="console.log('button clicked')"
//         >
//           {{ Math.random().toString(36).substring(2, 15) }}
//         </Button>
//       </td>
//       <td class="transportation-exception-admin__pending-requests-table-cell">
//         {{ record }}
//       </td>
//       <td
//         class="transportation-exception-admin__school transportation-exception-admin__pending-requests-table-cell"
//       >
//         {{ Math.random().toString(36).substring(2, 15) }}
//       </td>
//       <td class="transportation-exception-admin__pending-requests-table-cell">
//         {{ Math.random().toString(36).substring(2, 15) }}
//       </td>
//       <td class="transportation-exception-admin__pending-requests-table-cell">
//         {{ Math.random().toString(36).substring(2, 15) }}
//       </td>
//       <td class="transportation-exception-admin__pending-requests-table-cell">
//         {{ Math.random().toString(36).substring(2, 15) }}
//       </td>
//     </tr>
//   </tbody>

//   <tbody
//     v-else
//     id="transportation-exception-admin__pending-requests-table-error-no-records"
//     class="dps-position-absolute dps-w-100 dps-d-flex dps-justify-center dps-my-8"
//   >
//     <tr>
//       {{
//         store.error
//       }}
//     </tr>
//   </tbody>
// </template>

// /* Styles ================================================================ */
// <style lang="postcss">
// .transportation-exception-admin__school {
//   max-width: 13rem;
// }
// .transportation-exception-admin__pending-requests-student-id-button:hover {
//   text-decoration: underline;
// }
// </style>
