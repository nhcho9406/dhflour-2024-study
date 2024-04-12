// @mui
import {Box, Button, StackProps} from "@mui/material";
import { ConfirmDialog } from "../../custom-dialog";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  open: boolean;
  dataId: number | string;
  onClose: VoidFunction;
  onDeleteRow: VoidFunction;
}

export default function TableRowDeleteDiagram({
  open,
  dataId,
  onClose,
  onDeleteRow,
  sx,
  ...other
}: Props) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="삭제"
      content={<Box dangerouslySetInnerHTML={{__html: `<h3>ID "${dataId}" 데이터를 정말 삭제하시겠습니까?</h3> <br/>삭제 후, 복구가 불가합니다.`}} />}
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          네, 삭제합니다.
        </Button>
      }
    />
  );
}
