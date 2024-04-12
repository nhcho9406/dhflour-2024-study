import { Helmet } from 'react-helmet-async';
// sections
import FormValidationView from "../../../sections/_examples/extra/form-validation-view";

// ----------------------------------------------------------------------

export default function FormExPage() {
  return (
    <>
      <Helmet>
        <title> React Hook Form + Yup </title>
      </Helmet>

      <FormValidationView />
    </>
  );
}
