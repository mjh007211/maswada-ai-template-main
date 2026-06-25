import type { AutoSaveStatus, Note } from "@/types";
import { useState, useEffect } from "react";

type Props = {
  showNote: Note | null;
  isUserEditted: boolean;
  handleUpdatedNote: () => void;
};

export default function useAutoSave({
  showNote,
  isUserEditted,
  handleUpdatedNote,
}: Props) {
  const [autoSavingStatus, setAutoSaveStatus] =
    useState<AutoSaveStatus>("initial");

  useEffect(() => {
    if (!showNote || !isUserEditted) return;

    const setTimeOutId = setTimeout(() => {
      handleUpdatedNote();
    }, 2000);

    return () => clearTimeout(setTimeOutId);
  }, [showNote?.title, showNote?.content]);

  return { autoSavingStatus, setAutoSaveStatus };
}
