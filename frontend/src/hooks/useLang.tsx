import { LangContext } from "@/app/context/langContext/LangContext";
import { useContext } from "react";

export default function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within a lang provider");
  }
  return context;
}
