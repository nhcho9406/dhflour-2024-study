// ----------------------------------------------------------------------


import {PaginationMetadata} from "../../../types/board";

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: "asc" | "desc";
  orderBy: string;
  metadata: PaginationMetadata;
  //
  selected: number[];
  onSelectRow: (id: number) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: number[]) => void;
  //
  onResetPage: VoidFunction;
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
                             totalRows,
                             totalRowsInPage,
                             totalRowsFiltered,
                           }: {
    totalRows: number;
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<"desc" | "asc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;

  setPageMetadata: (metadata: PaginationMetadata) => void;
};

export const initialTable: TableProps = {
  dense: false,
  page: 0,
  rowsPerPage: 0,
  order: "desc",
  orderBy: "createdTime",
  metadata: {
    itemCount: 0,
    total: 0,
    size: 0,
    currentPage: 0,
    totalPages: 0
  },
  //
  selected: [],
  onSelectRow: (id: number) => {},
  onSelectAllRows: (checked: boolean, newSelecteds: number[]) => {},
  //
  onResetPage: () => {},
  onSort: (id: string) => {},
  onChangePage: (event: unknown, newPage: number) => {},
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {},
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => {},
  onUpdatePageDeleteRow: (totalRowsInPage: number) => {},
  onUpdatePageDeleteRows: ({
                             totalRows,
                             totalRowsInPage,
                             totalRowsFiltered,
                           }: {
    totalRows: number;
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => {},
  //
  setPage: ()=>{},
  setDense: ()=>{},
  setOrder: ()=>{},
  setOrderBy: ()=>{},
  setSelected: ()=>{},
  setRowsPerPage: ()=>{},

  setPageMetadata: (metadata: PaginationMetadata) => {}
}

export enum OrderDirection {
  UP = 'UP',
  DOWN = 'DOWN'
}
