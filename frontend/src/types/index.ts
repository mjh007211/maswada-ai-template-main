export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteDTO = {
  title: string | null;
  content: string | null;
};

export type UpdateNoteDTO = {
  title: string | null;
  content: string | null;
};

export type AutoSaveStatus =
  | "initial"
  | "saving"
  | "saved"
  | "pending"
  | "unsaved";
