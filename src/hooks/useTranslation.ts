import { useLanguage } from "./useLanguage";
import {
  translations,
  type TranslationKey,
} from "@/constants/translations.constants";

// Hook to get translations based on the selected language
// Returns a function that accepts a key and returns the translated text
export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return { t, language };
};
