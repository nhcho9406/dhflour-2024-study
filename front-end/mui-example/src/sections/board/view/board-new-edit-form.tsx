import * as Yup from "yup";
import {useEffect, useMemo} from "react";
import {useNavigate} from "react-router-dom";
// form
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
// @mui
import {LoadingButton} from "@mui/lab";
import {Card, Divider, Stack, Typography} from "@mui/material";
import {useSnackbar} from 'src/components/snackbar';
// routes
// @types
// components
import FormProvider, {RHFMultiCheckbox, RHFSwitch} from "../../../components/hook-form";
import {useSettingsContext} from "../../../components/settings";
import {SpI18nEditor, SPI18nTextField} from "../../../components/hyperx/form";
import {BoardCategoryDTO, ReqBoard} from "src/types/board";

// ----------------------------------------------------------------------

type Props = {
    isEdit?: boolean;
    id?: number;
    currentData?: ReqBoard;
    categories: BoardCategoryDTO[];
    onEnd: VoidFunction;
};

export default function BoardNewEditForm({isEdit, id, currentData, categories, onEnd}: Props) {
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const NewProductSchema = Yup.object({
        // title: Yup.string().required("제목(한국어)는 필수 입력사항입니다.").max(100),
        // TODO : 다국어 설정에 따라 달라짐.
        title: Yup.object().shape({
            ko: Yup.string().required("제목(한국어)는 필수 입력사항입니다.").max(100),
            en: Yup.string().max(100),
            zhCn: Yup.string().max(100),
            zhTw: Yup.string().max(100),
            ja: Yup.string().max(100),
        }),
        content: Yup.object().shape({
            ko: Yup.string().required("내용(한국어)는 필수 입력사항입니다.").max(3000),
            en: Yup.string().max(100),
            zhCn: Yup.string().max(100),
            zhTw: Yup.string().max(100),
            ja: Yup.string().max(100),
        }),
        categoryIds: Yup.array().of(Yup.number()),
        top: Yup.boolean()
    });

    const defaultValues = useMemo(
        () => ({
            // title: currentData?.title.ko || ''
            title: {
                ko: currentData?.title.ko || "",
                en: currentData?.title.en || "",
                zhCn: currentData?.title.zhCn || "",
                zhTw: currentData?.title.zhTw || "",
                ja: currentData?.title.ja || "",
            },
            content: {
                ko: currentData?.content.ko || "",
                en: currentData?.content.en || "",
                zhCn: currentData?.content.zhCn || "",
                zhTw: currentData?.content.zhTw || "",
                ja: currentData?.content.ja || "",
            },
            categoryIds: currentData?.categoryIds || [],
            top: currentData?.top || false,
        }),
        [currentData]
    );

    const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentData) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentData]);

    const onSubmit = handleSubmit(async (data) => {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(data, 'data');
        const body = data as ReqBoard;
        if (isEdit) {
            if (!id) {
                enqueueSnackbar('수정할 ID가 없습니다.', {variant: "error"});
                return;
            }
            try {
                // const response = await Swagger.api.boardUpdate(id, body);
                // console.log(response, 'response');
                // if (response.status === 200) {
                //     enqueueSnackbar('수정이 완료되었습니다.', {variant: "success"});
                //     onEnd();
                //     return;
                // }
              enqueueSnackbar('수정이 완료되었습니다.', {variant: "success"});
            } catch (e) {
                console.error(e);
                enqueueSnackbar(e.message, {variant: "error"});
                return;
            }
        } else {
            try {
                // const response = await Swagger.api.boardCreate(body);
                // console.log(response, 'response');
                // if (response.status === 201) {
                //     enqueueSnackbar('등록이 완료되었습니다.', {variant: "success"});
                //     reset();
                //     onEnd();
                //     return;
                // }
              enqueueSnackbar('등록이 완료되었습니다.', {variant: "success"});
            } catch (e) {
                console.error(e);
                enqueueSnackbar(e.message, {variant: "error"});
                return;
            }
        }
        enqueueSnackbar('?', {variant: "warning"});
    });


    return (
        <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={3}>
                <Card>
                    <Stack spacing={3} sx={{p: 3}}>
                        <SPI18nTextField name="title" label="제목"/>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2">
                                본문
                            </Typography>

                            <SpI18nEditor simple name="content"/>
                        </Stack>
                    </Stack>
                </Card>
                <Divider/>
                <Card>
                    <Stack spacing={3} sx={{p: 3}}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2">
                                카테고리
                            </Typography>
                            <RHFMultiCheckbox
                                name="categoryIds"
                                options={categories ? categories.map((category) => ({
                                    label: typeof category.name === 'string' ? category.name : category.name.ko,
                                    value: category.id
                                })) : []}
                                sx={{width: 1}}
                                row
                            />
                        </Stack>
                        <Divider sx={{borderStyle: 'dashed'}}/>
                        <RHFSwitch name="top" label="상단고정"/>
                    </Stack>


                </Card>


            </Stack>
            <Stack sx={{mt: 5}}>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    size="large"
                    loading={isSubmitting}
                >
                    {!isEdit ? "등록하기" : "수정하기"}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}
