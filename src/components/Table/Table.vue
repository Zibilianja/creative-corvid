/* ==========================================================================
This component is the main component of the application.
========================================================================== */
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { DataTable, Column, InputText, MultiSelect, Select } from 'primevue';
import VueTableDataLoader from '@/components/VueTableDataLoader.vue';
import ErrorSummary from '@/components/Singletons/ErrorSummary.vue';
import type { TableDataConfig } from '@/types';
import { useI18n } from 'vue-i18n';

const { d } = useI18n();
const dt = ref<{
  totalRecordsLength: number;
  exportCSV: (event: unknown) => void;
}>({
  totalRecordsLength: 0,
  exportCSV: () => {},
});
const error = ref('');
const loading = ref(true);
const table = ref<TableDataConfig>({
  title: '',
  url: '',
  sortMode: '',
  showActionColumn: false,
  openUrl: '',
  columns: [],
});
const items = ref<Record<string, unknown>[]>([]);
const globalFilterFields = ref<string[]>([]);
const filters = ref<{ [key: string]: { value: null; matchMode: string } }>({
  global: { value: null, matchMode: 'contains' },
});
const dateColumns = ref<Record<string, string[]>>({
  date: [],
  datetime: [],
});

const processDateAndDateTimeColumns = async (): Promise<void> => {
  for (let i = 0; i < items.value.length; i++) {
    const keys = Object.keys(items.value[i]);
    for (const key of keys) {
      if (dateColumns.value['date'].includes(key)) {
        const date = items.value[i][key] as string;
        items.value[i][key] =
          date.indexOf('T') > -1 ? date.substring(0, 10) : date;
      }
    }
  }
  return;
};

const getColumnUniqueSelectionOptions = (field: string): unknown[] => {
  const uniqueValues = new Set();
  for (const item of items.value) {
    if (item[field]) {
      uniqueValues.add(item[field]);
    }
  }
  return Array.from(uniqueValues).sort();
};

const getColumnUniqueMultiSelectOptions = (field: string): unknown[] => {
  const uniqueValues = new Set();
  for (const item of items.value) {
    uniqueValues.add(item[field]);
  }
  return Array.from(uniqueValues).map((value) => ({
    label: value,
    value: value,
  }));
};

const onActionButtonClick = (data: unknown): void => {
  if (table.value.openUrl) {
    if (typeof data === 'object' && data && 'id' in data) {
      const link = table.value.openUrl.replace('{{id}}', data['id'] as string);
      window.location.assign(link);
    }
  }
};

const getDate = (date: string): string => {
  const _date = new Date(date);
  return d(new Date(_date.toISOString().slice(0, -1)), 'short');
};

const exportCSV = (event: unknown): void => {
  dt.value.exportCSV(event);
};
</script>

/* Template ============================================================== */
<template>
  <div class="vue-table-data__app-container">
    <VueTableDataLoader v-if="loading && !error" />
    <ErrorSummary v-if="error" :error="error" />
    <div v-if="!loading && !error" class="vue-table-data__table-wrapper">
      <DataTable
        ref="dt"
        v-model:filters="filters"
        :value="items"
        striped-rows
        paginator
        :rows="25"
        :rows-per-page-options="[25, 50, 75, 100]"
        size="small"
        sort-mode="multiple"
        removable-sort
        filter-display="row"
        :global-filter-fields="globalFilterFields"
      >
        <template #header>
          <h2
            class="dps-vue-table-data-header dps-d-flex dps-items-center dps-col-gap-2 dps-mt-4 dps-mb-6"
          >
            <i class="pi pi-table" /><span>{{ table.title }}</span>
          </h2>
          <div class="dps-vue-table-data-keyword-search-container">
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />

            <button
              icon="pi pi-external-link"
              label="Export"
              class="dps-vue-table-data-export-button"
              @click="exportCSV($event)"
            >
              <span><i class="pi pi-file-export" /> </span>
              <span>Export</span>
            </button>
          </div>
        </template>
        <template #empty>No records found.</template>

        <template v-if="dt" #paginatorstart>
          {{ dt.totalRecordsLength }}
          {{
            dt.totalRecordsLength > 1
              ? 'records'
              : dt.totalRecordsLength === 0
                ? 'records'
                : 'record'
          }}
        </template>
        <template #paginatorend> &nbsp; </template>

        <Column v-if="table.columns[0].field === 'action'" :exportable="false">
          <template #body="{ data }">
            <button
              class="dps-vue-table-data-action-button p-button-sm"
              @click="onActionButtonClick(data)"
            >
              Open
            </button>
          </template>
        </Column>

        <Column
          v-for="column in table.columns"
          :key="column.field"
          :field="column.field"
          :filter-field="column.field"
          :header="column.header ?? ''"
          :sortable="column.sortable"
          :show-filter-menu="column.showFilterMenu"
          :show-clear-button="column.showClearButton"
          :header-style="column.headerStyle ? column.headerStyle : ''"
          :exportable="column.exportable"
        >
          <template v-if="column.field !== 'action'" #body="{ data }">
            <span v-if="column.filter && column.filter.type === 'date'">
              {{ getDate(data[column.field]) }}
            </span>
            <span v-else>
              {{ data[column.field] }}
            </span>
          </template>

          <template
            v-if="column.field !== 'action' && column.filterable"
            #filter="{ filterModel, filterCallback }"
          >
            <InputText
              v-if="
                column.filter!.type === 'text' ||
                column.filter!.type === 'date' ||
                column.filter!.type === 'number'
              "
              v-model="filterModel.value"
              :type="column.filter!.type"
              :placeholder="column.filter!.placeholder"
              :style="column.filter?.style ? column.filter.style : ''"
              @input="filterCallback()"
            />

            <Select
              v-if="column.filter!.type === 'select'"
              v-model="filterModel.value"
              filter
              :options="getColumnUniqueSelectionOptions(column.field)"
              :placeholder="column.filter?.placeholder"
              :aria-label="column.header"
              :style="column.filter?.style ? column.filter?.style : ''"
              @change="filterCallback()"
            />

            <MultiSelect
              v-if="column.filter!.type === 'multi-select'"
              v-model="filterModel.value"
              :options="getColumnUniqueMultiSelectOptions(column.field)"
              option-label="label"
              option-value="value"
              placeholder="All"
              filter
              :max-selected-labels="1"
              :style="column.filter?.style ? column.filter.style : ''"
              @change="filterCallback()"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option.label }}</span>
                </div>
              </template>
            </MultiSelect>
          </template>

          <template v-if="column.filterable" #filtericon>
            <i
              v-show="!filters[column.field].value"
              class="pi pi-filter"
              aria-label="Filter"
            />
            <i
              v-show="filters[column.field].value"
              class="pi pi-filter-fill"
              aria-label="Filter"
            />
          </template>

          <template v-if="column.filterable" #filterclearicon>
            <i class="pi pi-filter-slash" aria-label="Clear filter" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

/* Styles ================================================================ */
<style lang="postcss">
.vue-table-data__table-wrapper {
  border-top: 6px solid var(--dps-color-primary);
  border-bottom: 10px solid var(--dps-color-primary);
  border-left: 1px solid var(--dps-color-dark-gray);
  border-right: 1px solid var(--dps-color-dark-gray);
  max-width: calc(100vw - 3rem);

  .dps-vue-table-data-header {
    color: var(--dps-color-dark-orange);

    i {
      &.pi-table {
        font-size: 1.5rem;
      }
    }
  }

  .dps-vue-table-data-keyword-search-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
    align-items: center;
    input {
      width: 100%;
    }

    @media (max-width: 620px) {
      flex-direction: column;
      row-gap: 0.5rem;
    }
  }

  .dps-vue-table-data-action-button {
    background-color: var(--dps-color-primary) !important;
    color: #fff !important;
    border: 0;
    border-radius: 0.25rem;
  }

  .dps-vue-table-data-export-button {
    background-color: var(--dps-color-dark-gray) !important;
    color: #fff !important;
    border: 0;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;

    @media (max-width: 620px) {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
