// @mui
import {Checkbox, Divider, IconButton, MenuItem, TableCell, TableRow, Typography} from "@mui/material";
// utils
// @types
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import TableRowDeleteDiagram from "src/components/hyperx/table/table-row-delete-diagram";
import {useSnackbar} from "src/components/snackbar";
import LocalizedText from "src/components/hyperx/localized";
import CategoryNameText from "src/components/hyperx/localized/CategoryNameText";
import {fDateTime} from "../../../utils/format-time";
import CustomPopover, {usePopover} from "../../../components/custom-popover";
import {useBoolean} from "../../../hooks/use-boolean";
import {BoardDTO} from "../../../types/board";

// ----------------------------------------------------------------------

type Props = {
    row: BoardDTO;
    selected: boolean;
    onSelectRow: VoidFunction;
    onViewRow: VoidFunction;
    onEditRow: VoidFunction;
    onRefreshData: VoidFunction;
};

export default function BoardTableRow({
                                          row,
                                          selected,
                                          onSelectRow,
                                          onViewRow,
                                          onEditRow,
                                          onRefreshData,
                                      }: Props) {
    const {enqueueSnackbar} = useSnackbar();
    const {
        id,
        title,
        categories,
        pageView,
        top,
        createdTime,
    } = row;
    const openRowDeleteDiagram = useBoolean();
    const openPopover = usePopover();

    const handleDelete = async (_id: number) => {
        try {
            // const {data} = await Swagger.api.boardDelete(_id);
            // enqueueSnackbar(data.message, {variant: "success"});
          enqueueSnackbar('데이터가 삭제되었습니다.', {variant: "success"});
        } catch (e) {
            console.error(e);
            enqueueSnackbar(e.message, {variant: "error"});
        }
        openRowDeleteDiagram.onFalse();
        onRefreshData();
    };

    return (
        <>
            <TableRow hover selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={onSelectRow}/>
                </TableCell>


                <TableCell>{id}</TableCell>

                <TableCell>
                    <Typography
                        variant="body2"
                        sx={{cursor: "pointer"}}
                        onClick={() => {
                            onViewRow();
                            openPopover.onClose();
                        }}
                    >
                        <LocalizedText value={title}/>
                    </Typography>
                </TableCell>

                <TableCell align="center">
                    <CategoryNameText array={categories as any}/>
                </TableCell>

                <TableCell align="center">
                    {top &&
                        <Label variant="soft" color="secondary"
                               startIcon={<Iconify icon="majesticons:pin"/>}>
                            상단고정
                        </Label>
                    }
                </TableCell>

                <TableCell align="center">{pageView}</TableCell>

                <TableCell align="center">{fDateTime(createdTime)}</TableCell>

                <TableCell align="right">
                    <IconButton
                        color={openPopover.open ? "inherit" : "default"}
                        onClick={openPopover.onOpen}
                    >
                        <Iconify icon="eva:more-vertical-fill"/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <CustomPopover
                open={openPopover.open}
                onClose={openPopover.onClose}
                arrow="right-top"
                sx={{width: 160}}
            >
                <MenuItem
                    onClick={() => {
                        onViewRow();
                        openPopover.onClose();
                    }}
                >
                    <Iconify icon="eva:eye-fill"/>
                    상세
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onEditRow();
                        openPopover.onClose();
                    }}
                >
                    <Iconify icon="mingcute:pencil-line"/>
                    수정
                </MenuItem>

                <Divider sx={{borderStyle: "dashed"}}/>

                <MenuItem
                    onClick={() => {
                        openRowDeleteDiagram.onTrue();
                        openPopover.onClose();
                    }}
                    sx={{color: "error.main"}}
                >
                    <Iconify icon="eva:trash-2-outline"/>
                    삭제
                </MenuItem>
            </CustomPopover>

            <TableRowDeleteDiagram
                open={openRowDeleteDiagram.value}
                dataId={id}
                onClose={() => openRowDeleteDiagram.onFalse()}
                onDeleteRow={() => handleDelete(id)}
            />
        </>
    );
}
