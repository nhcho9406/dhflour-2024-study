// @mui
//
import { Box, SxProps, Tooltip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { LocalizedDTO } from "src/types/board";
import { useSettingsContext } from "../../settings";

// ----------------------------------------------------------------------

type Props = {
  value: string | LocalizedDTO;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  sx?: SxProps<Theme>;
};

export default function LocalizedText({ value, placement, sx }: Props) {
  const { systemLanguage, systemMultilingual, systemDefaultLanguage } =
    useSettingsContext();
  // console.log('systemLanguage', systemLanguage);
  // console.log('systemMultilingual', systemMultilingual);
  // console.log('systemDefaultLanguage', systemDefaultLanguage);
  const displayBlock = { display: "block" };
  const _placement = placement ?? "top-start";
  return systemMultilingual ? (
    <Box component="span" sx={sx}>
      {typeof value !== "string" && value.ko && systemLanguage.ko && (
        <Tooltip title="한국어" placement={_placement}>
          <Box component="span" sx={displayBlock}>
            {value.ko}
          </Box>
        </Tooltip>
      )}
      {typeof value !== "string" && value.en && systemLanguage.en && (
        <Tooltip title="영어" placement={_placement}>
          <Box component="span" sx={displayBlock}>
            {value.en}
          </Box>
        </Tooltip>
      )}
      {typeof value !== "string" && value.zhCn && systemLanguage.zhCn && (
        <Tooltip title="중국어 간체" placement={_placement}>
          <Box component="span" sx={displayBlock}>
            {value.zhCn}
          </Box>
        </Tooltip>
      )}
      {typeof value !== "string" && value.zhTw && systemLanguage.zhTw && (
        <Tooltip title="중국어 번체" placement={_placement}>
          <Box component="span" sx={displayBlock}>
            {value.zhTw}
          </Box>
        </Tooltip>
      )}
      {typeof value !== "string" && value.ja && systemLanguage.ja && (
        <Tooltip title="일본어" placement={_placement}>
          <Box component="span" sx={displayBlock}>
            {value.ja}
          </Box>
        </Tooltip>
      )}
    </Box>
  ) : (
    <Box component="span" sx={displayBlock}>
      {typeof value !== "string" ? (value as any)[systemDefaultLanguage] : value}
    </Box>
  );
}
