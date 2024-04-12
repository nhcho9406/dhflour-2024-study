// ----------------------------------------------------------------------
export interface LanguageSetting {
  ko: boolean;
  en: boolean;
  zhCn: boolean;
  zhTw: boolean;
  ja: boolean;
}

export type SettingsValueProps = {
  themeStretch: boolean;
  themeMode: 'light' | 'dark';
  themeDirection: 'rtl' | 'ltr';
  themeContrast: 'default' | 'bold';
  themeLayout: 'vertical' | 'horizontal' | 'mini';
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
  systemMultilingual: boolean;
  systemLanguage: LanguageSetting;
  systemDefaultLanguage: "ko" | "en" | "zhCn" | "znTw" | "ja";
};

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: string | boolean) => void;
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void;
  // Reset
  canReset: boolean;
  onReset: VoidFunction;
  // Drawer
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
