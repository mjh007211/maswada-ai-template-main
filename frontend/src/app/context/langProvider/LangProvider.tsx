import { LangContext } from "../langContext/LangContext";
import { useEffect, useState } from "react";
import { defaultLang, type Local } from "@/i18";

type Props = {
  children: React.ReactNode;
};

export default function LangProvider({ children }: Props) {
  const [local, setLocal] = useState<Local>(defaultLang);

  const isRTL = local === "ar";

  const toggleLang = () => {
    setLocal(local === "en" ? "ar" : "en");
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltl";
    document.documentElement.lang = local;
  }, [local, isRTL]);
  return (
    <LangContext.Provider value={{ local, isRTL, setLocal, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
