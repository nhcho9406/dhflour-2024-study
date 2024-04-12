import {useEffect} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import FormHelperText from '@mui/material/FormHelperText';
import Editor, {EditorProps} from "../../editor";
import {useSettingsContext} from "../../settings";
import RHFEditor from "../../hook-form/rhf-editor";
//


// ----------------------------------------------------------------------

interface Props extends EditorProps {
    name: string;
}

export default function SPI18nEditor({name, helperText, ...other}: Props) {
    const {themeStretch, systemLanguage, systemMultilingual, systemDefaultLanguage} = useSettingsContext();

    if (systemMultilingual) {
        return <>다국어</>;
    }
    return (
        <RHFEditor editorId={name} name={`${name}.${systemDefaultLanguage}`} helperText={helperText} {...other}/>
    );
}
