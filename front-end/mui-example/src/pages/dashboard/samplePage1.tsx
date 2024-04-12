import { Helmet } from 'react-helmet-async';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

export default function SamplePage1() {
  return (
    <>
      <Helmet>
        <title> SamplePage1 </title>
      </Helmet>

      <Container>
        <Typography>SamplePage1</Typography>
      </Container>
    </>
  );
}
