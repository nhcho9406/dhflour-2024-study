// @mui 라이브러리에서 필요한 컴포넌트와 타입들을 가져옵니다.
import { Theme } from '@mui/material/styles';
import {
  Box,
  Switch,
  SxProps,
  TablePagination,
  FormControlLabel,
  TablePaginationProps,
} from '@mui/material';
//

// ----------------------------------------------------------------------

// Props 타입을 정의합니다. 여기에는 dense, onChangeDense 및 sx와 같은 옵셔널 프로퍼티가 포함됩니다.
type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

// TablePaginationCustom 컴포넌트를 정의합니다.
export default function TablePaginationCustom({
                                                dense,
                                                onChangeDense,
                                                rowsPerPageOptions = [5, 7, 10, 15, 20, 100, 200], // 페이지당 행 옵션의 기본값을 설정합니다.
                                                sx,
                                                ...other
                                              }: Props & TablePaginationProps) { // Props와 TablePaginationProps 두 타입을 결합하여 사용합니다.
  return (
      <Box sx={{ position: 'relative', ...sx }}>
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions} // 페이지당 행의 옵션을 설정합니다.
            component="div"
            SelectProps={{
                inputProps: {
                    "aria-label": "rows per page",
                },
                native: true,
            }}
            {...other}
        />

        {onChangeDense && ( // onChangeDense가 존재할 경우에만 Dense 스위치를 표시합니다.
            <FormControlLabel
                label="Dense"
                control={<Switch checked={dense} onChange={onChangeDense} />}
                sx={{
                  pl: 2,
                  py: 1.5,
                  top: 0,
                  position: {
                    md: 'absolute',
                  }, // 반응형 스타일링: 중간 브레이크포인트(md)에서는 절대 위치를 사용합니다.
                }}
            />
        )}
      </Box>
  );
}
