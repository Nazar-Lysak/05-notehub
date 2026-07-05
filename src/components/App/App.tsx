import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";

function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input className={css.input} type="text" placeholder="Search notes" />
        <Pagination />
        <button className={css.button}>Create note +</button>
        <NoteList />
      </header>
    </div>
  );
}

export default App;
