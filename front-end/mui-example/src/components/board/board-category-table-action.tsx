import {IconButton, Stack, Tooltip} from "@mui/material";
import Iconify, {IconifyProps} from "../iconify";

type Props = {
    onOpenSelectedDeleteDiagram: VoidFunction;
};

export default function BoardCategoryTableAction({onOpenSelectedDeleteDiagram}: Props) {

    return <Stack direction="row">
        {/* <Tooltip title="복제하기"> */}
        {/*    <IconButton */}
        {/*        color="primary" */}
        {/*        onClick={() => enqueueSnackbar("복제")} */}
        {/*    > */}
        {/*        <Iconify icon="tabler:copy"/> */}
        {/*    </IconButton> */}
        {/* </Tooltip> */}

        {/* <Tooltip title="Download"> */}
        {/*  <IconButton color="primary"> */}
        {/*    <Iconify icon="eva:download-outline" /> */}
        {/*  </IconButton> */}
        {/* </Tooltip> */}

        {/* <Tooltip title="Print"> */}
        {/*  <IconButton color="primary"> */}
        {/*    <Iconify icon="eva:printer-fill" /> */}
        {/*  </IconButton> */}
        {/* </Tooltip> */}

        <Tooltip title="삭제하기">
            <IconButton
                color="primary"
                onClick={onOpenSelectedDeleteDiagram}
            >
                <Iconify icon="eva:trash-2-outline"/>
            </IconButton>
        </Tooltip>
    </Stack>
}