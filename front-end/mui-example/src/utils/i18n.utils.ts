import { LocalizedDTO } from "src/types/board";


export function valueByLang(data: LocalizedDTO, systemDefaultLanguage: "ko" | "en" | "zhCn" | "znTw" | "ja"): string {

    switch (systemDefaultLanguage) {
        case 'ko':
            return data.ko;
        case 'en':
            return data.en;
        case 'zhCn':
            return data.zhCn;
        case 'znTw':
            return data.zhTw;
        case 'ja':
            return data.ja;
        default:
            return '';
    }
}
