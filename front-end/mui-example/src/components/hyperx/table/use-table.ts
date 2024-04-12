import { useState, useCallback } from 'react';
//
import { TableProps } from './types';
import {PaginationMetadata} from "../../../types/board";

// ----------------------------------------------------------------------

type ReturnType = TableProps;

export type UseTableProps = {
    defaultDense?: boolean;
    defaultOrder?: 'asc' | 'desc';
    defaultOrderBy?: string;
    defaultSelected?: number[];
    defaultRowsPerPage?: number;
    defaultCurrentPage?: number;
};

interface SortObject {
    [key: string]: 'asc' | 'desc' | SortObject;
}

export const DEFAULT_HEIGHT = 76;
export const LOW_HEIGHT = 56;

export const ROW_COUNT = 7;

export function transformSortJSON(sortJSON: string): string {
    const sortString = JSON.parse(sortJSON);
    const [fullPath, direction] = Object.entries(sortString)[0] as [string, 'asc' | 'desc'];
    const pathParts = fullPath.split('.');
    const sortObject: SortObject = {};
    let currentObject: SortObject = sortObject;

    pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) { // Last part
            currentObject[part] = direction;
        } else {
            currentObject[part] = {};
            currentObject = currentObject[part] as SortObject;
        }
    });

    return JSON.stringify(sortObject);
}

export default function useTable(props?: UseTableProps): ReturnType {

    const [dense, setDense] = useState(!!props?.defaultDense);
    const [page, setPage] = useState(props?.defaultCurrentPage || 0);
    const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');
    const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);
    const [order, setOrder] = useState<'asc' | 'desc'>(props?.defaultOrder || 'asc');
    const [selected, setSelected] = useState<number[]>(props?.defaultSelected || []);
    const [metadata, setMetadata] = useState<PaginationMetadata>({ total: 0, itemCount: 0, size: 10, currentPage: 1, totalPages: 0 });

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === 'asc';
            if (id !== '') {
                setOrder(isAsc ? 'desc' : 'asc');
                setOrderBy(id);
            }
        },
        [order, orderBy]
    );

    const onSelectRow = useCallback(
        (inputValue: number) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];
            setSelected(newSelected);
        },
        [selected]
    );

    const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    }, []);

    const onChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    }, []);

    const onSelectAllRows = useCallback((checked: boolean, inputValue: number[]) => {
        if (checked) {
            setSelected(inputValue);
            return;
        }
        setSelected([]);
    }, []);

    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    const onUpdatePageDeleteRow = useCallback(
        (totalRowsInPage: number) => {
            setSelected([]);
            if (page) {
                if (totalRowsInPage < 2) {
                    setPage(page - 1);
                }
            }
        },
        [page]
    );

    const onUpdatePageDeleteRows = useCallback(
        ({
             totalRows,
             totalRowsInPage,
             totalRowsFiltered,
         }: {
            totalRows: number;
            totalRowsInPage: number;
            totalRowsFiltered: number;
        }) => {
            const totalSelected = selected.length;

            setSelected([]);

            if (page) {
                if (totalSelected === totalRowsInPage) {
                    setPage(page - 1);
                } else if (totalSelected === totalRowsFiltered) {
                    setPage(0);
                } else if (totalSelected > totalRowsInPage) {
                    const newPage = Math.ceil((totalRows - totalSelected) / rowsPerPage) - 1;
                    setPage(newPage);
                }
            }
        },
        [page, rowsPerPage, selected.length]
    );

    const setPageMetadata = useCallback(async (_metadata: PaginationMetadata) => {
        setMetadata(_metadata);
    }, []);

    return {
        dense,
        order,
        page,
        orderBy,
        rowsPerPage,
        metadata,
        //
        selected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangePage,
        onChangeDense,
        onResetPage,
        onChangeRowsPerPage,
        onUpdatePageDeleteRow,
        onUpdatePageDeleteRows,
        //
        setPage,
        setDense,
        setOrder,
        setOrderBy,
        setSelected,
        setRowsPerPage,
        setPageMetadata
    };
}
