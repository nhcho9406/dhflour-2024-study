import React from 'react';
import {Button, Input, Box, Stack} from '@mui/material';
import {ArrowDownward, ArrowDropDown, ArrowDropUp, ArrowUpward} from '@mui/icons-material';
import Typography from "@mui/material/Typography";

interface RowOrderInputProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onUpdate: () => void;
}

const RowOrderInput: React.FC<RowOrderInputProps> = ({value, onIncrement, onDecrement, onUpdate}) => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
    >
        <Button onClick={onDecrement} size="small" sx={{width: 30, minWidth: 20, pl:0, pr:0}}>
            <ArrowDropDown/>
        </Button>

        <Button onClick={onUpdate} size="small" sx={{fontWeight: 'normal', width: 30, minWidth: 20, pl:0, pr:0}}>
            {value}
        </Button>

        <Button onClick={onIncrement} size="small" sx={{width: 30, minWidth: 20, pl:0, pr:0}}>
            <ArrowDropUp/>
        </Button>
    </Stack>
);

export default RowOrderInput;