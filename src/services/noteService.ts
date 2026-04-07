import axios from "axios";
import type { Note } from "../types/note";

const PER_PAGE = 12;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const fetchAxios = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    "Authorization ": `Bearer ${TOKEN}`,
    "content-type": "application/json",
  },
});

interface FetchNotesProps {
  search: string;
  page: number;
}

interface createNoteProps {
  title: string;
  content: string;
  tag: Note["tag"];
}
interface FetchNotesResponese {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  search,
  page,
}: FetchNotesProps): Promise<FetchNotesResponese> {
  const response = await fetchAxios.get<FetchNotesResponese>("notes", {
    params: {
      search,
      page,
      perPage: PER_PAGE,
    },
  });
  return response.data;
}

export async function createNote(note: createNoteProps) {
  const { data } = await fetchAxios.post<Note>("/notes", note);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await fetchAxios.delete<Note>(`/notes/${id}`);
  return data;
}
