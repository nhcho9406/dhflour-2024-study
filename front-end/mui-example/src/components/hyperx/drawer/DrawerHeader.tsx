// @mui
import {Box, IconButton, MenuItem, Stack, StackProps, Tooltip, Typography,} from "@mui/material";
// routes
// hooks
// utils
// @types
// components
import Iconify from "src/components/iconify";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useState} from "react";
import SvgColor from "../../svg-color";
import {useResponsive} from "../../../hooks/use-responsive";
import CustomPopover from "../../custom-popover";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title: string;
  onClose: VoidFunction;
  onView?: VoidFunction | undefined;
  onEdit?: VoidFunction | undefined;
  onDelete?: VoidFunction | undefined;
  fullscreen?: boolean | undefined;
  onToggleFullscreen?: VoidFunction | undefined;
}

export default function DrawerHeader({
  title,
  onClose,
  onView,
  onEdit,
  onDelete,
  fullscreen,
  onToggleFullscreen,
  sx,
  ...other
}: Props) {
  const isEmptyMenu = !onView && !onEdit && !onDelete;
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const isDesktop = useResponsive("up", "sm");

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        flexShrink={0}
        sx={{
          px: 2,
          height: 80,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          ...sx,
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" flexGrow={1}>
          <Tooltip title="닫기">
            <IconButton onClick={onClose}>
              {isDesktop ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ ml: 2 }}>
            <Typography display="inline" variant="h5">
              {title}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center">
          {onToggleFullscreen && (
            <IconButton
              color={fullscreen ? "inherit" : "default"}
              onClick={onToggleFullscreen}
            >
              <SvgColor
                sx={{ width: `${4 * 4}px` }}
                src={`/assets/icons/setting/${
                  fullscreen ? "ic_exit_full_screen" : "ic_full_screen"
                }.svg`}
              />
            </IconButton>
          )}
          {!isEmptyMenu && (
            <IconButton
              color={openPopover ? "inherit" : "default"}
              onClick={handleOpenPopover}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <CustomPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              onView();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:eye-fill" />
            상세
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit();
              handleClosePopover();
            }}
          >
            <Iconify icon="mingcute:pencil-line" />
            수정
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete();
              handleClosePopover();
            }}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="eva:trash-2-outline" />
            삭제
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
}
