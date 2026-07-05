import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number
}

interface handleSubmitInterface {
  title: string;
  content: string;
  tag: NoteTag
}

const TOKEN = import.meta.env.VITE_TOKEN;
const API_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (note: string, page: number): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(API_URL, {
    params: {
      search: note,
      page,
      perPage: 10
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
};

export const createNote = async (note: handleSubmitInterface) => {
  const { data } = await axios.post(
    API_URL,
    note,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return data;
};

export const deleteNote = async (id: string): Promise<FetchNotesResponse> => {
  const { data } = await axios.delete<FetchNotesResponse>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};
