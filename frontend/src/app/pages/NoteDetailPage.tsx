import { GlassCard } from "@/components/common/GlassCard";
import { DeleteButton } from "@/components/note/DeleteButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { Note } from "@/types";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function NoteDetailPage() {
  const [showNote, setShowNote] = useState<Note | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserEditted, setIsUserEditted] = useState(false);
  const { getNoteById, updateNotes, deleteNotes } = useNotesAPI();
  const navigator = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigator(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowNote((prev) => (prev ? { ...prev, title: e.target.value } : null));
    setIsUserEditted(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowNote((prev) => (prev ? { ...prev, content: e.target.value } : null));
    setIsUserEditted(true);
  };

  const handleUpdatedNote = async () => {
    if (!showNote) {
      return;
    }

    const updateNote = await updateNotes(
      { title: showNote.title, content: showNote.content },
      showNote.id,
    );

    if (updateNote) {
      setShowNote(updateNote);
      toast.success("Note updated successfully");
    }
    setIsUserEditted(false);
  };
  const handleDeleteNote = async () => {
    if (!showNote) {
      return;
    }

    const isDelete = await deleteNotes(showNote.id);
    if (isDelete) {
      navigator("/");
      toast.success("Note deleted successfully");
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
    return <div>Loading...</div>;
  }

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Button
          className="cursor-pointer"
          onClick={handleBack}
          variant="outline"
        >
          <ArrowLeft /> Back to all notes
        </Button>
        <DeleteButton handleDelete={handleDeleteNote} />
      </div>

      <div className="flex flex-col gap-4">
        <Input
          value={showNote?.title || ""}
          className="bg-transparent border-none dark:bg-transparent focus-visible:ring-0"
          placeholder="Title"
          onChange={handleTitleChange}
        />
        <Textarea
          value={showNote?.content || ""}
          rows={20}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]"
          placeholder="Content"
          onChange={handleContentChange}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          className="cursor-pointer disabled:hover:cursor-not-allowed"
          disabled={!isUserEditted}
          onClick={handleUpdatedNote}
        >
          Save Note
        </Button>
      </div>
    </GlassCard>
  );
}
