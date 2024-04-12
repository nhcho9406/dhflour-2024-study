import Stack from "@mui/material/Stack";
import {useSampleManagerContext} from "../../sections/sample/sample-manage-provider";
import {TextField} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Sample1Component1() {
  // useSampleManagerContext 훅을 사용하여 컨텍스트로부터 필요한 값을 가져옵니다.
  const { value1, handleChangeValue1} = useSampleManagerContext();

  return <Stack sx={{p:2, bgcolor: 'pink'}}>
    <Typography variant="h3">Component1</Typography>
    <TextField
      label="Update Value1"
      variant="outlined"
      value={value1}
      onChange={(e) => handleChangeValue1(e.target.value)}
      fullWidth
    />
  </Stack>
}
