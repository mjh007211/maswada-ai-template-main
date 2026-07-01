import { GlassCard } from "@/components/common/GlassCard";
import AutoSaveIndicator from "@/components/note/AutoSaveIndicator";
import { DeleteButton } from "@/components/note/DeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAutoSave from "@/hooks/useAutoSave";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { Note } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FormattedMessage, useIntl } from "react-intl";

export default function NoteDetailPage() {
  const [showNote, setShowNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserEditted, setIsUserEditted] = useState(false);

  const handleUpdatedNote = async () => {
    if (!showNote) {
      return;
    }
    setAutoSaveStatus("saving");

    await updateNotes(
      { title: showNote.title, content: showNote.content },
      showNote.id,
    );
    setIsUserEditted(false);
    setAutoSaveStatus("saved");
  };

  const { autoSavingStatus, setAutoSaveStatus } = useAutoSave({
    isUserEditted,
    showNote,
    handleUpdatedNote,
  });
  const { getNoteById, updateNotes, deleteNotes } = useNotesAPI();
  const navigator = useNavigate();
  const { id } = useParams();
  const intl = useIntl();

  const handleBack = () => {
    navigator(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowNote((prev) => (prev ? { ...prev, title: e.target.value } : null));
    setIsUserEditted(true);
    setAutoSaveStatus("unsaved");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowNote((prev) => (prev ? { ...prev, content: e.target.value } : null));
    setIsUserEditted(true);
    setAutoSaveStatus("unsaved");
  };

  const handleDeleteNote = async () => {
    if (!showNote) {
      return;
    }

    const isDelete = await deleteNotes(showNote.id);
    if (isDelete) {
      navigator("/");
      toast.success(intl.formatMessage({ id: "note.deletedSuccess" }));
    }
  };

  useEffect(() => {
    if (!id) return;
    const fetchNote = async () => {
      const note = await getNoteById(id);
      if (note) {
        setShowNote(note);
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [getNoteById, id]);

  if (isLoading && !showNote) {
    return (
      <div>
        <FormattedMessage id="note.loading" />
      </div>
    );
  }

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            onClick={handleBack}
            variant="outline"
          >
            <ArrowLeft /> <FormattedMessage id="note.backToAll" />
          </Button>
          <AutoSaveIndicator autoSavingStatus={autoSavingStatus} />
        </div>

        <DeleteButton handleDelete={handleDeleteNote} />
      </div>

      <div className="flex flex-col gap-4">
        <Input
          value={showNote?.title || ""}
          className="bg-transparent border-none dark:bg-transparent focus-visible:ring-0 font-bold text-3xl!"
          placeholder={intl.formatMessage({ id: "note.titlePlaceholder" })}
          onChange={handleTitleChange}
        />
        <Textarea
          value={showNote?.content || ""}
          rows={20}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]"
          placeholder={intl.formatMessage({ id: "note.contentPlaceholder" })}
          onChange={handleContentChange}
        />
      </div>
    </GlassCard>
  );
}
