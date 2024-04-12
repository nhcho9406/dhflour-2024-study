import Stack from "@mui/material/Stack";
import {useSampleManagerContext} from "../../sections/sample/sample-manage-provider";
import Typography from "@mui/material/Typography";

export default function Sample1Component2() {
// useSampleManagerContext 훅을 사용하여 컨텍스트로부터 필요한 값을 가져옵니다.
  const {value1} = useSampleManagerContext();

  return <Stack sx={{p:2, bgcolor: 'yellow'}}>
    <Typography variant="h3">Component2</Typography>
    <Typography>{`Current Value1: ${value1 || ''}`}</Typography>
  </Stack>
}
