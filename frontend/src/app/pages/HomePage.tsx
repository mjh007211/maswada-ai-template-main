import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Note } from "@/types";
import useNotesAPI from "@/hooks/useNotesAPI";

export function HomePage() {
  const [notes, setNotes] = useState<Note[]>();
  const { getAllNotes } = useNotesAPI();
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, [getAllNotes]);
  return (
    <div className="space-y-12">
      <GlassCard className="px-6 py-10 sm:px-10"></GlassCard>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">My Notes</h2>
            <Button>
              <Plus /> New Note
            </Button>
          </div>
          <div className="relative">
            <Search
              size={19}
              color="gray"
              className="absolute top-2.5 left-3.5 "
            />
            <Input placeholder="Search here..." className="pl-11" />
          </div>
          {notes?.map((n) => (
            <GlassCard key={n.id} className="p-4">
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-5">
                  <FileText />
                  <h3>New Note</h3>
                </li>
              </ul>
            </GlassCard>
          ))}
        </GlassCard>
      </section>
    </div>
  );
}
function getUser(): { user: any } {
  throw new Error("Function not implemented.");
}
