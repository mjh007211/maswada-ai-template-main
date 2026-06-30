import type { Local } from "@/i18";
import { createContext } from "react";

type LangContext = {
  local: Local;
  isRTL: boolean;
  setLocal: (local: Local) => void;
  toggleLang: () => void;
};

export const LangContext = createContext<LangContext | undefined>(undefined);
