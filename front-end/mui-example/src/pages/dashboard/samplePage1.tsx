import {Helmet} from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useSampleManagerContext} from "../../sections/sample/sample-manage-provider";
import Iconify from "../../components/iconify";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import {Divider, TextField} from '@mui/material';

// ----------------------------------------------------------------------
export default function SamplePage1() {

  // useSampleManagerContext 훅을 사용하여 컨텍스트로부터 필요한 값을 가져옵니다.
  const {param1, param2, param3, handleMethod, value1, handleChangeValue1} = useSampleManagerContext();

  return (
    <>
      <Helmet>
        <title>SamplePage1</title>
      </Helmet>

      <Container>
        <Stack spacing={3}>
          <Typography variant="h4">SamplePage1</Typography>
          <Typography>{`param1 = ${param1}, param2 = ${param2}, param3 = ${param3}`}</Typography>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleMethod('Click!');
            }}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>}
          >
            Click
          </Button>
          
          <Divider />

          <TextField
            label="Update Value1"
            variant="outlined"
            value={value1}
            onChange={(e) => handleChangeValue1(e.target.value)}
            fullWidth
          />
          <Typography>{`Current Value1: ${value1}`}</Typography>

        </Stack>
      </Container>
    </>
  );
}
