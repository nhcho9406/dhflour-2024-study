import isEqual from "lodash/isEqual";
import {useEffect, useMemo, useCallback, useState} from "react";
// hooks
import {useLocalStorage} from "src/hooks/use-local-storage";
// utils
import {localStorageGetItem} from "src/utils/storage-available";
//
import {LanguageSetting, SettingsValueProps} from "../types";
import {SettingsContext} from "./settings-context";
import Axios from "../../../utils/axios";
import {BooleanSetting, SettingDTO} from "../../../types/settins";

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({
                                   children,
                                   defaultSettings,
                                 }: SettingsProviderProps) {
  const [systemSettings, setSystemSettings] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState(false);

  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  const isArabic = localStorageGetItem("i18nextLng") === "ar";

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang("ar");
    }

  }, [isArabic]);

  useEffect(() => {
    // const loadData = async () => {
    //   try {
    //     const accessToken = sessionStorage.getItem("accessToken");
    //     if (accessToken) {
    //       Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    //       // const { data } = await Swagger.api.getSetting();
    //       // setSystemSettings(data);
    //     }
    //   } catch (e) {
    //     console.error(e, "System Setting");
    //   }
    // };
    // loadData();
    setSystemSettings([{
      systemMultilingual: false,
    },
      {
        systemDefaultLanguage: 'ko',
      },
      {
        systemLanguage: {
          ko: true,
          en: false,
          zhCn: false,
          zhTw: false,
          ja: false
        }
      }])
  }, []);

  useEffect(() => {
    if (!systemSettings) {
      return;
    }
    const getValue = (key: string): any => {
      const setting = systemSettings.find(
        (s: { key: string; value: any }) => s.key === key,
      );
      if (setting) {
        return setting.value;
      }
      return undefined;
    };
    const multilingual = getValue("MULTILINGUAL") as BooleanSetting | undefined;
    const language = getValue("LANGUAGE") as LanguageSetting | undefined;
    const defaultLanguage = getValue("DEFAULT_LANGUAGE") as
      | SettingDTO
      | undefined;
    setSettings({
      ...settings,
      systemMultilingual: multilingual?.value || false,
      systemLanguage: language,
      systemDefaultLanguage: defaultLanguage?.value?.toString() || "ko",
    });

  }, [systemSettings]);

  const onUpdate = useCallback(
    (name: string, value: string | boolean) => {
      setSettings((prevState: SettingsValueProps) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setSettings],
  );

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      onUpdate("themeDirection", lang === "ar" ? "rtl" : "ltr");
    },
    [onUpdate],
  );

  // Reset
  const onReset = useCallback(() => {
    setSettings(defaultSettings);
  }, [defaultSettings, setSettings]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(settings, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...settings,
      onUpdate,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      onReset,
      onUpdate,
      settings,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ],
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
