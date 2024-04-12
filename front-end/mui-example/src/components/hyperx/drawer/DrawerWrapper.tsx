// @mui
import {Box, Drawer, DrawerProps, LinearProgress, Stack} from "@mui/material";
import {useEffect, useState} from "react";
// utils
// @types
// components
import DrawerHeader from "./DrawerHeader";
import Scrollbar from "src/components/scrollbar";
import Container from "@mui/material/Container";
import {useResponsive} from "../../../hooks/use-responsive";


// ----------------------------------------------------------------------

interface Props extends DrawerProps {
    loading?: boolean | false;
    title: string;
    children: React.ReactNode;
    hideBackdrop?: boolean | false;

    onClose: VoidFunction;
    onView?: VoidFunction | undefined;
    onEdit?: VoidFunction | undefined;
    onDelete?: VoidFunction | undefined;
}

export default function DrawerWrapper({
                                          loading,
                                          open,
                                          onClose,

                                          title,
                                          children,

                                          onView,
                                          onEdit,
                                          onDelete,

                                          hideBackdrop,

                                          ...other
                                      }: Props) {
    const isDesktop = useResponsive("up", "md");
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    useEffect(() => {
    }, []);

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            hideBackdrop={hideBackdrop}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        sm: fullscreen ? "100%" : "65%",
                        md: fullscreen ? "100%" : "50%",
                    },
                },
            }}
            {...other}
        >

            <DrawerHeader
                title={title}
                onClose={onClose}
                onDelete={onDelete}
                onView={onView}
                onEdit={onEdit}
                fullscreen={fullscreen}
                onToggleFullscreen={() => setFullscreen(!fullscreen)}
                sx={{bgcolor: 'background.paper'}}
            />
            {loading && <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>}
            <Scrollbar sx={{height: 1}}>
                <Stack spacing={2.5} justifyContent="center" sx={{p: 2.5}}>
                    <Container maxWidth={isDesktop ? "lg" : false} sx={{ mt: 3, mb: 5 }}>
                    {children}
                    </Container>
                </Stack>
            </Scrollbar>

            {/* <Box sx={{ p: 2.5 }}> */}
            {/*  <Button */}
            {/*    fullWidth */}
            {/*    variant="soft" */}
            {/*    color="error" */}
            {/*    size="large" */}
            {/*    startIcon={<Iconify icon="eva:trash-2-outline" />} */}
            {/*    onClick={onDelete} */}
            {/*  > */}
            {/*    Action */}
            {/*  </Button> */}
            {/* </Box> */}
        </Drawer>
    );
}

// ----------------------------------------------------------------------
