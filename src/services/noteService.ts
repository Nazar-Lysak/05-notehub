import axios from "axios";

interface FetchMoviesResponse {
  results: unknown[];
  total_pages: number 
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchNotes = async (note: string, page : number): Promise<FetchMoviesResponse> => {
  const {data} = await axios.get<FetchMoviesResponse>("https://notehub-public.goit.study/api/notes", {
    params: {
      query: note,
      page
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};

export const createNote = async (note: string): Promise<FetchMoviesResponse> => {
  const {data} = await axios.get<FetchMoviesResponse>("https://notehub-public.goit.study/api/notes", {
    params: {
      query: note,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};

export const deleteNote = async (id: string): Promise<FetchMoviesResponse> => {
  const {data} = await axios.get<FetchMoviesResponse>("https://notehub-public.goit.study/api/notes", {
    params: {
      query: id,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return data;
};
