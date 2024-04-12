import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fCurrency } from 'src/utils/format-number';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import {IBoardItem} from "../../types/board";
import Typography from "@mui/material/Typography";
import {fDateTime} from "../../utils/format-time";
import {BoardLabelComponent} from "../../utils/board";

// ----------------------------------------------------------------------

type Props = {
  row: IBoardItem;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function BoardTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: Props) {
  const {
    id,
    title,
    category,
    top,
    pageView,
    createdTime,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* 체크 박스 */}
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/* id */}
        <TableCell>
          <Typography variant='body2'> {id}</Typography>
        </TableCell>

        {/* 제목 */}
        <TableCell>
          <Typography
            variant="body2"
            sx={{cursor: "pointer"}}
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            {title}
          </Typography>
        </TableCell>

        {/* 카테고리 */}
        <TableCell align="center">
          {BoardLabelComponent(category)}
        </TableCell>

        {/* 상단고정 */}
        <TableCell align="center">
          {top &&
            <Label variant="soft" color="success">
              고정
            </Label>
          }
        </TableCell>

        {/* 조회 수 */}
        <TableCell align="center">
          <Typography variant='body2'>{pageView}</Typography>
        </TableCell>

        {/* 등록 일시 */}
        <TableCell align="center">
          <Typography variant='body2'>{fDateTime(createdTime)}</Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          상세 보기
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          수정
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          삭제
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
