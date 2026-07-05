import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

function App() {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["todos", searchQuery, page],
    queryFn: () => fetchNotes(searchQuery, page),
    placeholderData: keepPreviousData
  });

  const createTodoMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log('done')
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSearch = useDebouncedCallback((query: string) => {
    setSearchQuery(query);
  }, 700);

  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input className={css.input} type="text" placeholder="Search notes" onChange={(e) => handleSearch(e.target.value)} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
        )}

        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <h2>Something went wrong</h2>}
      {isSuccess && data.notes.length > 0 && (
        <NoteList notes={data.notes} deleteTodoMutation={deleteTodoMutation.mutate} />
      )}
      {modal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} handleSubmit={createTodoMutation.mutate} />
        </Modal>
      )}

    </div>
  );
}

export default App;
