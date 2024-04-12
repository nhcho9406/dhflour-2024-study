// @mui
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack, {StackProps} from "@mui/material/Stack";
// types
// components
import Iconify from "src/components/iconify";
import {shortDateLabel} from "src/components/custom-date-range-picker";
import {IBoardFilters, IBoardFilterValue} from "src/types/board";
import {fDate} from "../../utils/format-time";

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IBoardFilters;
  onFilters: (name: string, value: IBoardFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function BoardTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  const handleRemoveService = (inputValue: number) => {
    const newValue = filters.categories.filter((item) => item.id !== inputValue);
    onFilters('categories', newValue);
  };

  const handleRemoveStatus = () => {
    onFilters('status', 'all');
  };

  const handleRemoveStartDate = () => {
    onFilters('startDate', null);
  };

  const handleRemoveEndDate = () => {
    onFilters('endDate', null);
  };


  const handleRemoveQuery = () => {
    onFilters('query', "");
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          개 데이터가 검색 되었습니다.
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.categories.length && (
          <Block label="카테고리:">
            {filters.categories.map((category) => (
              <Chip
                key={category.id}
                label={typeof category.name === 'string' ? category.name : category.name.ko}
                size="small"
                onDelete={() => handleRemoveService(category.id)}
              />
            ))}
          </Block>
        )}

        {filters.status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {filters.startDate && (
          <Block label="시작일:">
            <Chip size="small" label={filters.startDate && fDate(filters.startDate)} onDelete={handleRemoveStartDate} />
          </Block>
        )}

        {filters.endDate && (
          <Block label="종료일:">
            <Chip size="small" label={filters.endDate && fDate(filters.endDate)} onDelete={handleRemoveEndDate} />
          </Block>
        )}

        {filters.query && (
          <Block label="검색어:">
            <Chip size="small" label={filters.query} onDelete={handleRemoveQuery} />
          </Block>
        )}


        {/* {filters.startDate && filters.endDate && ( */}
        {/*  <Block label=":"> */}
        {/*    <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} /> */}
        {/*  </Block> */}
        {/* )} */}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:restart-bold" />}
        >
          초기화
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
