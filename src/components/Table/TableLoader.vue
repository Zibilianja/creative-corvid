/* ==========================================================================
component.vue Describe what this component does.
========================================================================== */
<script setup lang="ts">
import { ref } from 'vue';
import { DataTable, Column, Skeleton } from 'primevue';

const rows = ref(new Array(5));
</script>

/* Template ============================================================== */
<template>
  <div class="vue-table-data__loader-container">
    <div class="vue-table-data__loader-header">
      <div class="loading-animation"></div>
      <div class="vue-table-data__loader-header-message">
        Fetching table data...
      </div>
    </div>
    <DataTable :value="rows">
      <Column field="column1" header="...">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="column2" header="...">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="column3" header="...">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
      <Column field="column4" header="...">
        <template #body>
          <Skeleton></Skeleton>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.vue-table-data__loader-container {
  border-left: 1px solid #4a4a4a;
  border-right: 1px solid #4a4a4a;
  border-bottom: 1px solid #4a4a4a;

  .vue-table-data__loader-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f8f9fa;
    border-top: 1px solid #4a4a4a;
    border-bottom: 1px solid #4a4a4a;
    border-radius: 0.25rem;
    padding: 1.25rem;

    .vue-table-data__loader-header-message {
      width: 100%;
      text-align: center;
      font-size: 1.25rem;
    }
  }
}
</style>
