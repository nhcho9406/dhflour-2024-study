import {Helmet} from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useSampleManagerContext} from "../../sections/sample/sample-manage-provider";
import Stack from '@mui/material/Stack';
import Sample1Component1 from "../../components/sample1/sample1Component1";
import Sample1Component2 from "../../components/sample1/sample1Component2";

// ----------------------------------------------------------------------
export default function SamplePage1() {
// useSampleManagerContext 훅을 사용하여 컨텍스트로부터 필요한 값을 가져옵니다.
  const {param1, param2, param3, handleMethod} = useSampleManagerContext();


  return (
    <>
      <Helmet>
        <title>React Hook Sample 2</title>
      </Helmet>

      <Container>
        <Stack spacing={3}>
          <Typography variant="h4">React Hook Sample 2</Typography>

          <Sample1Component1/>
          <Sample1Component2/>

        </Stack>
      </Container>
    </>
  );
}
