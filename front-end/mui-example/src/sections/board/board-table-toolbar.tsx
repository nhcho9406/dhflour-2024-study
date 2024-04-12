// @mui
import {Button, InputAdornment, Stack, TextField} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
// components
import {useCallback, useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import CustomPopover, {usePopover} from "src/components/custom-popover";
import {useSnackbar} from "src/components/snackbar";
import {BoardCategoryDTO, IBoardFilters, IBoardFilterValue} from "src/types/board";
import Iconify from "src/components/iconify";
// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;
const DATE_FORMAT = "yyyy-MM-dd";

type Props = {
    filters: IBoardFilters;
    onFilters: (name: string, value: IBoardFilterValue) => void;
    dateError: boolean;
    categoryOptions: BoardCategoryDTO[];
};

export default function BoardTableToolbar({
                                              filters,
                                              onFilters,
                                              dateError,
                                              categoryOptions,
                                          }: Props) {

    const {enqueueSnackbar} = useSnackbar();
    const popover = usePopover();
    const [searchText, setSearchText] = useState("");
    const handleSearchTextChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSearchText(event.target.value);
    };

    const handleFilterQuery = useCallback(
        (query: string) => {
            console.log(query,'query');
            onFilters("query", query);
        },
        [onFilters],
    );

    const getCategory = (id: number): BoardCategoryDTO | undefined => {
        if (categoryOptions && categoryOptions.length > 0) {
            const matchedCategory = categoryOptions.find(category => category.id === id);
            if (!matchedCategory) {
                throw new Error(`No category found for ID: ${id}`);
            }
            return matchedCategory;
        }
        return undefined;
    }

    const handleFilterCategory = useCallback(
        (event: SelectChangeEvent<number[]>) => {
            const selectedIds = event.target.value as number[]; // 선택된 ID들의 배열

            console.log(selectedIds, '# selectedIds');

            const selectedCategories = selectedIds.map(id => getCategory(id)).filter(category => category !== undefined) as BoardCategoryDTO[];
            console.log(selectedCategories, '# selectedCategories');
            onFilters(
                "categories",
                selectedCategories
            );
        },

        [onFilters, categoryOptions],
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

    const handleSearch = () => {
        if (!searchText || searchText.length < 2) {
            enqueueSnackbar("2글자 이상 작성해주세요.", {
                variant: "warning",
            });
            return;
        }
        handleFilterQuery(searchText);
    };

    useEffect(() => {
        setSearchText(filters.query);
    }, [filters.query]);

    return (
        <>
            <Stack
                spacing={2}
                alignItems={{xs: "flex-end", md: "center"}}
                direction={{
                    xs: "column",
                    md: "row",
                }}
                sx={{
                    p: 2.5,
                    pr: {xs: 2.5, md: 1},
                }}
            >
                <FormControl
                    sx={{
                        flexShrink: 0,
                        width: {xs: 1, md: INPUT_WIDTH},
                    }}
                >
                    <InputLabel>카테고리</InputLabel>

                    <Select
                        multiple
                        value={filters.categories.map((category) => category.id)}
                        onChange={handleFilterCategory}
                        input={<OutlinedInput label="카테고리"/>}
                        renderValue={(selected) =>
                            selected.map((id) => {
                                const category = getCategory(id);
                                if (category !== undefined) {
                                    if (typeof category.name === 'string') {
                                        return category.name;
                                    }
                                    return category.name.ko;
                                }
                                return undefined;
                            }).filter((name) => name !== undefined).join(", ")
                        }
                        sx={{textTransform: "capitalize"}}
                    >
                        {categoryOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                <Checkbox
                                    disableRipple
                                    size="small"
                                    checked={filters.categories.map((category) => category.id).includes(option.id)}
                                />
                                {`${typeof option.name === 'string' ? option.name : option.name.ko}`}
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
                            error: dateError,
                        },
                    }}
                    sx={{
                        maxWidth: {md: INPUT_WIDTH},
                    }}
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    flexGrow={1}
                    sx={{width: 1}}
                >
                    <TextField
                        fullWidth
                        value={searchText}
                        onChange={handleSearchTextChange}
                        placeholder="검색어를 입력하세요."
                        onKeyDown={(ev) => {
                            if (ev.key === "Enter") {
                                handleSearch();
                            }
                        }}
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

                    {/* <IconButton onClick={popover.onOpen}> */}
                    {/*  <Iconify icon="eva:more-vertical-fill" /> */}
                    {/* </IconButton> */}
                </Stack>
            </Stack>

            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{width: 140}}
            >
                {/* <MenuItem */}
                {/*  onClick={() => { */}
                {/*    popover.onClose(); */}
                {/*  }} */}
                {/* > */}
                {/*  <Iconify icon="solar:printer-minimalistic-bold" /> */}
                {/*  Print */}
                {/* </MenuItem> */}

                {/* <MenuItem */}
                {/*  onClick={() => { */}
                {/*    popover.onClose(); */}
                {/*  }} */}
                {/* > */}
                {/*  <Iconify icon="solar:import-bold" /> */}
                {/*  Import */}
                {/* </MenuItem> */}

                <MenuItem
                    onClick={() => {
                        popover.onClose();
                    }}
                >
                    <Iconify icon="solar:export-bold"/>
                    Export
                </MenuItem>
            </CustomPopover>
        </>
    );
}
