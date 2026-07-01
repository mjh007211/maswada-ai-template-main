import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Note } from "@/types";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

export function HomePage() {
  const [notes, setNotes] = useState<Note[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const { getAllNotes, createNotes } = useNotesAPI();
  const navigator = useNavigate();
  const intl = useIntl();

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    };

    fetchNotes();
  }, [getAllNotes]);

  const handleCreateNotes = async () => {
    const newNote = await createNotes({
      title: intl.formatMessage({ id: "home.defaultNoteTitle" }),
      content: "-",
    });
    if (newNote) {
      navigator(`/notes/${newNote.id}`);
    }
  };

  const handleNoteNavigation = (noteId: string) => {
    navigator(`/notes/${noteId}`);
  };

  const getFilterNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes;
    }

    const query = searchQuery.toLocaleLowerCase();

    const filterNotes = notes?.filter((note) =>
      note.title.toLocaleLowerCase().includes(query),
    );
    return filterNotes;
  }, [notes, searchQuery]);

  return (
    <div className="space-y-12">
      <GlassCard className="px-6 py-10 sm:px-10"></GlassCard>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl">
              <FormattedMessage id="home.myNotes" />
            </h2>
            <Button className="cursor-pointer" onClick={handleCreateNotes}>
              <Plus /> <FormattedMessage id="home.newNote" />
            </Button>
          </div>
          <div className="relative">
            <Search
              size={19}
              color="gray"
              className="absolute top-2.5 left-3.5 "
            />
            <Input
              placeholder={intl.formatMessage({ id: "home.searchPlaceholder" })}
              className="pl-11"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
          {getFilterNotes?.map((note) => (
            <GlassCard
              onClick={() => handleNoteNavigation(note.id)}
              key={note.id}
              className="p-4 cursor-pointer"
            >
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-5">
                  <FileText />
                  <h3>{note.title}</h3>
                </li>
              </ul>
            </GlassCard>
          ))}
        </GlassCard>
      </section>
    </div>
  );
}
