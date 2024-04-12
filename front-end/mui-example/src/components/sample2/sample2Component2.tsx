import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Props = {
  value: string
}
export default function Sample2Component2({value}: Props) {

  return <Stack sx={{p:2, bgcolor: 'yellow'}}>
    <Typography variant="h3">Component2</Typography>
    <Typography>{`Current Value1: ${value}`}</Typography>
  </Stack>
}
