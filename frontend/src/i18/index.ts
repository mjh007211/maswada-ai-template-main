import ar from "./ar.json";
import en from "./en.json";

export const messages = {
  ar,
  en,
};

export type Local = keyof typeof messages;

export const defaultLang = "en";

export const supportedLangs = ["en", "ar"];
