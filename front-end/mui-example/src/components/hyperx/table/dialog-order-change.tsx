// @mui
import {TableRow, TableCell} from '@mui/material';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useEffect} from "react";
import {useBoolean} from "../../../hooks/use-boolean";

// ----------------------------------------------------------------------

type Props = {
    show?: boolean;
};

export default function DialogOrderChange({show}: Props) {
    const _show = show || false;
    const dialog = useBoolean(show);

    return (
        <Dialog open={dialog.value} onClose={dialog.onFalse}>
            <DialogTitle>Subscribe</DialogTitle>

            <DialogContent>
                <Typography sx={{mb: 3}}>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </Typography>

                <TextField
                    autoFocus
                    fullWidth
                    type="email"
                    margin="dense"
                    variant="outlined"
                    label="Email Address"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={dialog.onFalse} variant="outlined" color="inherit">
                    Cancel
                </Button>
                <Button onClick={dialog.onFalse} variant="contained">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    );
}
