import {createContext, useCallback, useContext, useMemo, useState,} from 'react';
import {useLocation} from "react-router-dom";
import {useSnackbar} from "notistack";
import {fTimestamp} from "../../utils/format-time";
import {ROW_COUNT} from "../../components/hyperx/table/use-table";
import {initialTable, TableProps, useTable} from "../../components/hyperx/table";
import {BoardDTO, IBoardFilters, IBoardFilterValue} from "../../types/board";

// ----------------------------------------------------------------------
type ApplyFilterProps = {
  inputData: BoardDTO[];
  comparator: (a: any, b: any) => number;
  filters: IBoardFilters;
  dateError: boolean;
}
const defaultFilters: IBoardFilters = {
  query: "",
  categories: [],
  status: "all",
  startDate: null,
  endDate: null,
};

type Props = {
  searchParams: URLSearchParams;
  paramPage: number;
  paramSize: number;
  paramQuery: string;
  paramStartDate: string;
  paramEndDate: string;

  table: TableProps;
  denseHeight: number;
  defaultFilters: IBoardFilters;
  filters: IBoardFilters;
  handleFilters: (name: string, value: IBoardFilterValue) => void;
  handleResetFilters: () => void;

  onDeleteData: (id: number) => void;
};
const initialState: Props = {
  searchParams: new URLSearchParams(''),
  paramPage: 0,
  paramSize: 0,
  paramQuery: '',
  paramStartDate: '',
  paramEndDate: '',

  table: initialTable,
  denseHeight: 72,
  defaultFilters,
  filters: defaultFilters,
  handleFilters: (name: string, value: IBoardFilterValue) => {
  },
  handleResetFilters: () => {
  },

  onDeleteData: (id: number) => {
  }
};
export const BoardManagerContext = createContext(initialState);

export const useBoardManagerContext = () => {
  const context = useContext(BoardManagerContext);

  if (!context)
    throw new Error(
      'useBoardManaderContext must be use inside BoardManaderProvider'
    );

  return context;
};

type ManagerProviderProps = {
  children: React.ReactNode;
};

// BoardManagerProvider 컴포넌트를 정의합니다. children prop을 사용하여 이 프로바이더 내의 요소를 전달합니다.
export function BoardManagerProvider({children}: ManagerProviderProps) {
  // 알림을 위해 임시 팝업(스낵바)을 표시하는 훅입니다.
  const {enqueueSnackbar} = useSnackbar();

  // React Router에서 위치 객체에 접근하기 위한 훅입니다.
  const location = useLocation();

  // 현재 URL의 쿼리 매개변수에서 `searchParams`를 파생시키고, 불필요한 재계산을 방지하기 위해 메모이제이션합니다.
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // URL에서 페이징 및 필터링 매개변수를 추출하고, 없을 경우 기본값을 사용합니다.
  const paramPage = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
  const paramSize = searchParams.get("size") ? Number(searchParams.get("size")) : ROW_COUNT;
  const paramQuery = searchParams.get("query") || "";
  const paramStartDate = searchParams.get("startTime") || "";
  const paramEndDate = searchParams.get("endTime") || "";

  // 정렬 및 페이징과 같은 테이블 상태를 관리하기 위한 사용자 정의 훅입니다.
  const table = useTable({
    defaultOrderBy: "id",
    defaultOrder: "desc",
    defaultRowsPerPage: paramSize,
    defaultCurrentPage: paramPage,
  });
  const [filters, setFilters] = useState(defaultFilters); // 필터 객체

  // 테이블 밀도 설정에 따라 행 높이를 계산합니다.
  const denseHeight = table.dense ? 52 : 72;

  // 필터 변경을 처리하는 콜백으로, 변경 시 페이지네이션을 재설정합니다.
  const handleFilters = useCallback(
    (name: string, value: IBoardFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  // 모든 필터를 기본값으로 재설정하는 콜백입니다.
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // 데이터 삭제를 처리하는 콜백으로, API 호출(주석 처리됨) 및 알림이 포함될 수 있습니다.
  const onDeleteData = useCallback((id: number) => {
    try {
      // const {data} = await Swagger.api.boardDelete(d);
      // enqueueSnackbar(data.message, {variant: "success"});
      console.log('delete');
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.message, {variant: "error"});
    }
  }, [enqueueSnackbar]);

  // 성능을 최적화하고 불필요한 렌더링을 방지하기 위해 제공자 값에 메모이제이션을 적용합니다.
  const memoizedValue = useMemo(
    () => ({
      searchParams,
      paramPage,
      paramSize,
      paramQuery,
      paramStartDate,
      paramEndDate,

      table,
      denseHeight,

      defaultFilters,
      filters,
      handleFilters,
      handleResetFilters,

      onDeleteData
    }),
    [
      searchParams,
      paramPage,
      paramSize,
      paramQuery,
      paramStartDate,
      paramEndDate,
      table,
      denseHeight,
      filters,
      handleFilters,
      handleResetFilters,
      onDeleteData]
  );

  return (
    <BoardManagerContext.Provider value={memoizedValue}>
      {children}
    </BoardManagerContext.Provider>
  );
}

export const applyFilter = ({
                              inputData,
                              comparator,
                              filters: f,
                              dateError
                            }: ApplyFilterProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {startDate, endDate} = f;
  console.log(inputData, 'inputData');
  console.log(f, 'filter');

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // if (name) {
  //   inputData = inputData.filter(
  //     (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  //   );
  // }
  //
  // if (status !== 'all') {
  //   inputData = inputData.filter((user) => user.status === status);
  // }
  //
  // if (role.length) {
  //   inputData = inputData.filter((user) => role.includes(user.role));
  // }
  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (data) =>
          fTimestamp(data.createdTime) >= fTimestamp(startDate) &&
          fTimestamp(data.createdTime) <= fTimestamp(endDate),
      );
    }
  }
  return inputData;
};
