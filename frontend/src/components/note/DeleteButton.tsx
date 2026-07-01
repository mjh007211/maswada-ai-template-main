import { Trash2Icon } from "lucide-react";
import { FormattedMessage } from "react-intl";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  handleDelete: () => void;
};

export function DeleteButton({ handleDelete }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive">
          <FormattedMessage id="note.delete" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            <FormattedMessage id="note.deleteTitle" />
          </AlertDialogTitle>
          <AlertDialogDescription>
            <FormattedMessage id="note.deleteConfirm" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            <FormattedMessage id="note.cancel" />
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            <FormattedMessage id="note.deleteAction" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
