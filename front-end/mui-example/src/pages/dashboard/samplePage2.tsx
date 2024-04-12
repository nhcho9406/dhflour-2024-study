import { Helmet } from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

export default function SamplePage2() {
  return (
    <>
      <Helmet>
        <title> SamplePage2 </title>
      </Helmet>

      <Container>
        <Typography>SamplePage2</Typography>
      </Container>
    </>
  );
}
