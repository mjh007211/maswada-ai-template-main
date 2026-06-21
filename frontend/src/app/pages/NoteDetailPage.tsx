import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import type { Note } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function NoteDetailPage() {
  const [showNote, setShowNote] = useState<Note | null>();
  const { getNoteById } = useNotesAPI();
  const navigator = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigator(-1);
  };

  useEffect(() => {
    if (!id) return;
    const fetchNote = async () => {
      const note = await getNoteById(id);
      if (note) {
        setShowNote(note);
      }
    };
    fetchNote();
  }, [getNoteById, id]);

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
      </div>

      <div className="flex flex-col gap-4">
        <Input
          value={showNote?.title || ""}
          className="bg-transparent border-none dark:bg-transparent focus-visible:ring-0"
          placeholder="Title"
        />
        <Textarea
          value={showNote?.content || ""}
          rows={20}
          className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]"
          placeholder="Content"
        />
      </div>
    </GlassCard>
  );
}
