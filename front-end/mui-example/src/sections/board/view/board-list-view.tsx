import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Table, TableBody, TableContainer} from "@mui/material";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import {useSettingsContext} from "src/components/settings";
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationActions,
  TablePaginationCustom,
  TableSelectedAction,
  TableSkeletonAll
} from "src/components/hyperx/table";
import {BoardTableRow} from "src/sections/board/index";
import TableSelectedDeleteDiagram from "src/components/hyperx/table/table-selected-delete-diagram";
import {useSnackbar} from "src/components/snackbar";
import BoardTableToolbar from "src/sections/board/board-table-toolbar";
import {transformSortJSON} from "src/components/hyperx/table/use-table";
import {DrawerWrapper} from "src/components/hyperx/drawer";
import TableRowDeleteDiagram from "src/components/hyperx/table/table-row-delete-diagram";
import BoardTableAction from "src/components/board/board-table-action";
import isEqual from "lodash/isEqual";
import {useBoolean} from "src/hooks/use-boolean";
import BoardTableFiltersResult from "../board-table-filters-result";
import {paths, ROOT_PAGE_NAME} from "../../../routes/paths";
import {fISO} from "../../../utils/format-time";
import {applyFilter, useBoardManagerContext} from "../board-manage-provider";
import BoardNewEditForm from "./board-new-edit-form";
import BoardViewBody from "./board-view-body";
import {BoardCategoryDTO, BoardDTO} from "../../../types/board";
import axios from "axios";

// ----------------------------------------------------------------------
const BOARD_TYPE = "NOTICE";


const TABLE_HEAD = [
  {id: "id", label: "ID", align: "left"},
  {id: "title", label: "제목", align: "left", width: 220},
  {id: "categories.name", label: "카테고리", align: "center"},
  {id: "top", label: "상단고정", align: "center"},
  {id: "pageView", label: "페이지 뷰", align: "center"},
  {id: "createdTime", label: "등록시간", align: "center"},
  {id: ""},
];

type Props = {
  pageName: string;
}

export default function BoardListView({pageName}: Props) {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {themeStretch, systemLanguage, systemMultilingual, systemDefaultLanguage} = useSettingsContext();
  const {enqueueSnackbar} = useSnackbar();
  const {
    table,
    denseHeight,

    defaultFilters,
    filters,
    handleFilters,
    handleResetFilters,

    searchParams,
    paramQuery,
    paramStartDate,
    paramEndDate,
  } = useBoardManagerContext();

  //= Loading State
  const [listDataLoading, setListDataLoading] = useState<boolean>(false);
  const [detailDataLoading, setDetailDataLoading] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<BoardDTO>();
  const [categoryDataLoading, setCategoryDataLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<BoardCategoryDTO[]>([]);

  //= Popup
  const openNew = useBoolean();
  const openView = useBoolean();
  const openEdit = useBoolean();
  const openRowDeleteDiagram = useBoolean();
  const openSelectedDeleteDiagram = useBoolean();

  //= DATA
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [tableData, setTableData] = useState<BoardDTO[]>([]);

  const dateError = filters.startDate && filters.endDate ? filters.startDate.getTime() > filters.endDate.getTime() : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const loadData = async () => {
    setListDataLoading(true);
    setTableData([]);
    let _query = '';
    if (filters.query && filters.query.length > 1) {
      _query = filters.query;
    }
    // const {data} = await Swagger.api.boardPage({
    //     type: BOARD_TYPE,
    //     size: table.rowsPerPage,
    //     page: table.page + 1,
    //     query: _query,
    //     startTime: fISO(filters.startDate),
    //     endTime: fISO(filters.endDate),
    //     categoryIds: filters.categories !== undefined ? filters.categories.map((category) => category.id).filter((id) => id !== undefined) : [],
    //     orderBy:
    //         table.orderBy &&
    //         transformSortJSON(
    //             JSON.stringify({
    //                 [table.orderBy]: table.order,
    //             }),
    //         ),
    // });
    console.log(table.rowsPerPage, 'table.rowsPerPage');
    console.log(table.page + 1, 'table.page + 1');
    const {data} = await axios.get('/mock/board-ex.json');
    console.log(data, 'board');
    setTableData(data.items);
    table.setPageMetadata(data.metadata);
    setListDataLoading(false);
  };

  const loadCategoryData = async () => {
    setCategoryDataLoading(true);
    try {
      // const {data} = await Swagger.api.boardCategories({type: "NOTICE"});
      // if (data && data.items) {
      //     setCategories(data.items);
      // }
      const {data} = await axios.get('/mock/category-ex.json');
      if (data && data.items) {
          setCategories(data.items);
      }
      handleFilters("categories", []);
    } catch (e) {
      console.error(e);
    }
    setCategoryDataLoading(false);
  };

  const loadDetailData = async (id: number) => {
    setDetailDataLoading(true);
    // const {data} = await Swagger.api.boardGet(id);
    // setDetailData(data);
    const {data} = await axios.get('/mock/board-detail-ex.json');
    setDetailData(data);
    setDetailDataLoading(false);
  };

  const handleReset = async () => {
    loadData();
    loadCategoryData();
  };

  const handleCloseDrawer = () => {
    openNew.onFalse();
    openEdit.onFalse();
    openView.onFalse();
    setSelectedId(undefined);
  };

  const handleOpenNew = () => {
    openNew.onTrue();
    openEdit.onFalse();
    openView.onFalse();
    setSelectedId(undefined);
  };

  const handleOpenEdit = (id: number | undefined) => {
    openNew.onFalse();
    openEdit.onTrue();
    openView.onFalse();
    setSelectedId(id);
  };

  const handleOpenView = (id: number | undefined) => {
    openNew.onFalse();
    openEdit.onFalse();
    openView.onTrue();
    setSelectedId(id);
  };

  const handleDeleteRows = async (selectedRows: number[]) => {
    try {
      // const {data} = await Swagger.api.boardDeleteByIds(selectedRows);
      // table.setSelected([]);
      // enqueueSnackbar(data.message, {variant: "success"});
      enqueueSnackbar('데이터가 삭제되었습니다.', {variant: "success"});
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.message, {variant: "error"});
    }
    handleReset().then(() => {console.log('Completed reset')});
    openSelectedDeleteDiagram.onFalse()
  };

  const handleDeleteRow = async (id: number | undefined) => {
    if (id) {
      try {
        // const {data} = await Swagger.api.boardDelete(id);
        // enqueueSnackbar(data.message, {variant: "success"});
        enqueueSnackbar('데이터가 삭제되었습니다.', {variant: "success"});
        handleCloseDrawer();
        handleReset().then(() => {console.log('Completed reset')});
      } catch (e) {
        console.error(e);
        enqueueSnackbar(e.message, {variant: "error"});
      }
    }
  };

  useEffect(() => {
    loadCategoryData().then(() => {console.log('loadedCategory Data')});
  }, []);

  useEffect(() => {
    updateSearchParams(); // Update search parameters
    loadData().then(() => {console.log('loaded default Data')});
    navigate(`?${searchParams.toString()}`); // Update the URL with the current search parameters

  }, [
    table.rowsPerPage,
    table.page,
    table.orderBy,
    table.order,
    filters.query,
    filters.startDate,
    filters.endDate,
    filters.categories,
    categories
  ]);

  function updateSearchParams() {
    searchParams.set("page", String(table.page));
    searchParams.set("size", String(table.rowsPerPage));

    if (filters.query) {
      searchParams.set("query", String(filters.query));
    }
    if (filters.startDate && !Number.isNaN(filters.startDate.getTime())) {
      searchParams.set("startTime", filters.startDate.toISOString());
    }
    if (filters.endDate && !Number.isNaN(filters.endDate.getTime())) {
      searchParams.set("endTime", filters.endDate.toISOString());
    }
  }

  useEffect(() => {
    if (paramQuery) {
      handleFilters("query", paramQuery);
    }
    if (paramStartDate) {
      try {
        const startDate: Date = new Date(decodeURIComponent(paramStartDate));
        if (Number.isNaN(startDate.getTime())) {
          handleFilters("startDate", startDate);
        }
      } catch (e) {
        console.error('e', e);
      }
    }
    if (paramEndDate) {
      try {
        const endDate: Date = new Date(decodeURIComponent(paramEndDate));
        if (Number.isNaN(endDate.getTime())) {
          handleFilters("endDate", endDate);
        }
      } catch (e) {
        console.error('e', e);
      }
    }

  }, [paramQuery, paramStartDate, paramEndDate]);

  useEffect(() => {
    if (selectedId) {
      loadDetailData(selectedId);
    } else {
      setDetailData(undefined);
    }
  }, [selectedId]);

  return (
    <>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={pageName}
          links={[
            {
              name: ROOT_PAGE_NAME,
              href: paths.dashboard.root,
            },
            {
              name: pageName,
            },
          ]}
          action={
            <Button
              onClick={() => handleOpenNew()}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill"/>}
            >
              새글 작성
            </Button>
          }
        />

        <Card
          sx={{
            mt: {xs: 3, md: 5},
            mb: {xs: 3, md: 5},
          }}
        >
          <BoardTableToolbar
            filters={filters}
            onFilters={handleFilters}
            dateError={dateError}
            categoryOptions={categories}
          />

          {canReset && (
            <BoardTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={table.metadata.total}
              sx={{p: 2.5, pt: 0}}
            />
          )}

          <TableContainer sx={{position: "relative", overflow: "unset"}}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id),
                )
              }
              action={
                <BoardTableAction
                  onOpenSelectedDeleteDiagram={() => openSelectedDeleteDiagram.onTrue()}/>
              }
            />

            <Scrollbar>
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{minWidth: 800}}
              >
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id),
                    )
                  }
                />
                <TableBody>
                  {!listDataLoading &&
                    dataFiltered.map((item: BoardDTO, index: number) => (
                      <BoardTableRow
                        key={item.id}
                        row={item}
                        selected={table.selected.includes(item.id)}
                        onSelectRow={() => table.onSelectRow(item.id)}
                        onViewRow={() => handleOpenView(item.id)}
                        onEditRow={() => handleOpenEdit(item.id)}
                        onRefreshData={() => handleReset()}
                      />
                    ))}
                  {!listDataLoading && table.metadata.total > 0 && (
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(
                        table.page,
                        table.rowsPerPage,
                        table.metadata.total,
                      )}
                    />
                  )}
                  {!listDataLoading && <TableNoData notFound={notFound}/>}
                  {listDataLoading && (dataFiltered.length === 0) && (
                    <TableSkeletonAll
                      size={table.metadata.size}
                      denseHeight={denseHeight}
                    />
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={table.metadata.total}
            colSpan={3}
            page={table.metadata.currentPage - 1}
            rowsPerPage={table.metadata.size}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
            ActionsComponent={TablePaginationActions}
          />
        </Card>

      </Container>

      <TableSelectedDeleteDiagram
        open={openSelectedDeleteDiagram.value}
        onClose={() => openSelectedDeleteDiagram.onFalse()}
        onDeleteSelected={() => {
          handleDeleteRows(table.selected);
        }}
        selected={table.selected}
      />

      {/* === Drawer === */}
      <DrawerWrapper
        title="새글 작성"
        open={openNew.value}
        onClose={handleCloseDrawer}
        children={
          <BoardNewEditForm categories={categories} onEnd={() => {
            handleCloseDrawer();
            handleReset();
          }}/>}
      />

      <DrawerWrapper
        loading={detailDataLoading}
        title="상세 보기"
        open={openView.value}
        onClose={handleCloseDrawer}
        onEdit={() => handleOpenEdit(selectedId)}
        onDelete={() => {
          openRowDeleteDiagram.onTrue();
        }}
        children={detailData && <BoardViewBody data={detailData}/>}
      />

      <DrawerWrapper
        loading={detailDataLoading}
        title="수정 하기"
        open={openEdit.value}
        onClose={handleCloseDrawer}
        onView={() => handleOpenView(selectedId)}
        onDelete={() => {
          openRowDeleteDiagram.onTrue();
        }}
        children={detailData &&
          <BoardNewEditForm
            isEdit
            id={detailData.id}
            currentData={{
              title: typeof detailData.title === 'string' ? {
                ko: detailData.title,
                en: '',
                zhCn: '',
                zhTw: '',
                ja: ''
              } : detailData.title,
              content: typeof detailData.content === 'string' ? {
                ko: detailData.content,
                en: '',
                zhCn: '',
                zhTw: '',
                ja: ''
              } : detailData.content,
              categoryIds: detailData.categories && detailData.categories.map((c) => c.id),
              top: detailData.top
            }} categories={categories} onEnd={() => {
            handleReset();
            if (selectedId) loadDetailData(selectedId);
          }}/>
        }
      />

      {/* === Delete === */}
      {selectedId && (
        <TableRowDeleteDiagram
          open={openRowDeleteDiagram.value}
          dataId={selectedId}
          onClose={() => openRowDeleteDiagram.onFalse()}
          onDeleteRow={() => handleDeleteRow(selectedId)}
        />
      )}
    </>
  );
}
