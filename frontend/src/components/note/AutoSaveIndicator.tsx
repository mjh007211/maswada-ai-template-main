import type { AutoSaveStatus } from "@/types";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { FormattedMessage } from "react-intl";

type Props = {
  autoSavingStatus: AutoSaveStatus;
};

export default function AutoSaveIndicator({ autoSavingStatus }: Props) {
  switch (autoSavingStatus) {
    case "saved":
      return (
        <div className="flex items-center gap-2">
          <CircleCheck className="text-green-800" size={20} />
          <span className="flex items-center gap-2 test-sm text-green-800">
            <FormattedMessage id="autosave.saved" />
          </span>
        </div>
      );
    case "pending":
      return (
        <span className="test-sm text-zinc-500">
          <FormattedMessage id="autosave.pending" />
        </span>
      );
    case "saving":
      return (
        <div className="flex items-center gap-2">
          <LoaderCircle className="text-zinc-500 animate-spin" size={20} />

          <span className="flex items-center gap-2 test-sm text-zinc-500">
            <FormattedMessage id="autosave.saving" />
          </span>
        </div>
      );
    case "unsaved":
      return (
        <div className="flex items-center gap-2">
          <CircleAlert className="text-orange-500" size={20} />

          <span className="flex items-center gap-2 test-sm text-orange-500">
            <FormattedMessage id="autosave.unsaved" />
          </span>
        </div>
      );
    case "initial":

    default:
      null;
  }
}
