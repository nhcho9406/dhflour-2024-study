import {TextFieldProps} from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useSettingsContext} from "../../settings";
import {RHFTextField} from "../../hook-form";

type Props = TextFieldProps & {
  name: string;
};

export default function SPI18nTextField({name, helperText, type, ...other}: Props) {
  const {themeStretch, systemLanguage, systemMultilingual, systemDefaultLanguage} = useSettingsContext();
  // console.log(themeStretch, "themeStretch");
  // console.log(systemLanguage, "systemLanguage");
  // console.log(systemMultilingual, "systemMultilingual");
  // console.log(systemDefaultLanguage, "systemDefaultLanguage");

  if (systemMultilingual) {
    return <>다국어</>;
  }
  return <Box>
    <RHFTextField name={`${name}.${systemDefaultLanguage}`} helperText={helperText} type={type} {...other} />
  </Box>;
}
