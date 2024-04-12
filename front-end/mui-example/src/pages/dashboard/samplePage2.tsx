import {Helmet} from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Sample1Component1 from "../../components/sample1/sample1Component1";
import Sample1Component2 from "../../components/sample1/sample1Component2";
import Stack from "@mui/material/Stack";
import Sample2Component1 from "../../components/sample2/sample2Component1";
import Sample2Component2 from "../../components/sample2/sample2Component2";
import {useCallback, useState} from "react";

// ----------------------------------------------------------------------

export default function SamplePage2() {

  const [value, setValue] = useState<string>("");

  // value 값을 업데이트하는 함수를 useCallback으로 메모이제이션합니다.
  const handleChangeValue = (value: string) => {
    setValue(value); // value 상태를 업데이트합니다.
  };

  return (
    <>
      <Helmet>
        <title> SamplePage2 </title>
      </Helmet>

      <Container>
        <Stack spacing={3}>
          <Typography variant="h4">React Hook Sample 3</Typography>
          <Sample2Component1 value={value} onMethod={handleChangeValue}/>
          <Sample2Component2 value={value}/>
        </Stack>
      </Container>
    </>
  );
}
