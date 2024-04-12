// @mui
//
import {Stack, SxProps} from "@mui/material";
import {Theme} from "@mui/material/styles";
import {valueByLang} from "../../../utils/i18n.utils";
import Label from "../../label";
import {useSettingsContext} from "../../settings";
import {LocalizedDTO} from "../../../types/board";

// ----------------------------------------------------------------------

type Props = {
    array: [{ id: number; name: string | LocalizedDTO; }];
    sx?: SxProps<Theme>;
};

export default function CategoryNameText({array, sx}: Props) {
    const {themeStretch, systemLanguage, systemMultilingual, systemDefaultLanguage} = useSettingsContext();
    // const systemDefaultLanguage = 'ko';
    return (
        <Stack sx={sx} direction="row" spacing={1}>
            {array && array.map((category) => <Label variant="soft" color="default" key={category.id}>
                {typeof category.name === 'string' ? category.name : valueByLang(category.name as LocalizedDTO, systemDefaultLanguage)}
            </Label>)}
        </Stack>
    );
}
