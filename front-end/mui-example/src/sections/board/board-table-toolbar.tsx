import {useCallback, useState} from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { Button } from '@mui/material';
import {useSnackbar} from "notistack";
import {IBoardFilterValue, IBoardTableFilters} from "../../types/board";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

// ----------------------------------------------------------------------
const INPUT_WIDTH = 180;
const DATE_FORMAT = "yyyy-MM-dd";

type Props = {
  filters: IBoardTableFilters;
  onFilters: (name: string, value: IBoardFilterValue) => void;
  categoryOptions: {
    value: string;
    label: string;
  }[];
};

export default function BoardTableToolbar({
  filters,
  onFilters,
  categoryOptions,
}: Props) {
  const popover = usePopover();
  const {enqueueSnackbar} = useSnackbar();

  const [searchText, setSearchText] = useState("");
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    if (!searchText || searchText.length < 2) {
      enqueueSnackbar("2글자 이상 작성해주세요.", {
        variant: "warning",
      });
      return;
    }
    // 필터 함수
  };


  const handleFilterCategory = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'category',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: Date | null) => {
      onFilters("startDate", newValue);
    },
    [onFilters],
  );

  const handleFilterEndDate = useCallback(
    (newValue: Date | null) => {
      onFilters("endDate", newValue);
    },
    [onFilters],
  );


  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: INPUT_WIDTH },
          }}
        >
          <InputLabel>카테고리</InputLabel>

          <Select
            multiple
            value={filters.category}
            onChange={handleFilterCategory}
            input={<OutlinedInput label="카테고리" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            sx={{ textTransform: 'capitalize',}}
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.category.includes(option.value)}
                />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="시작일"
          value={filters.startDate}
          onChange={handleFilterStartDate}
          slotProps={{textField: {fullWidth: true}}}
          format={DATE_FORMAT}
          sx={{
            maxWidth: {md: INPUT_WIDTH},
          }}
        />

        <DatePicker
          label="종료일"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          format={DATE_FORMAT}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
          sx={{
            maxWidth: {md: INPUT_WIDTH},
          }}
        />

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="검색어를 입력하세요."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{color: "text.disabled"}}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Button
                    size="small"
                    onClick={handleSearch}
                    color="inherit"
                    variant="contained"
                  >
                    검색
                  </Button>
                </InputAdornment>
              ),
            }}
          />

        </Stack>
      </Stack>
    </>
  );
}
