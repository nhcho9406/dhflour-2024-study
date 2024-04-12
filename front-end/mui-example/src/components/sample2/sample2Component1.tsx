import Stack from "@mui/material/Stack";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
  value: string,
  onMethod: (value: string) => void
}
export default function Sample2Component1({value, onMethod}: Props) {

  return <Stack sx={{p:2, bgcolor: 'pink'}}>
    <Typography variant="h3">Component1</Typography>
    <TextField
      label="Update Value1"
      variant="outlined"
      value={value}
      onChange={(e) => onMethod(e.target.value)}
      fullWidth
    />
  </Stack>
}
