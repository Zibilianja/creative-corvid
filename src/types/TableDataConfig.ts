export type TableDataConfig = {
  title: string;
  url: string;
  sortMode: string;
  showActionColumn: boolean;
  openUrl: string;
  columns: TableDataColumn[];
};

export type TableDataColumn = {
  field: string;
  header: string | null;
  sortable: boolean;
  filterable: boolean;
  showFilterMenu: boolean;
  showClearButton: boolean;
  headerStyle: string | null;
  filter: TableDataFilter | null;
  exportable: boolean;
};

export type TableDataFilter = {
  type: string;
  placeholder: string;
  matchMode: string;
  style: string | null;
};
