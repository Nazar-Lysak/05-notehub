import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  deleteTodoMutation: (id: string) => void;
}

function NoteList({ notes, deleteTodoMutation }: NoteListProps) {

  return (
    <ul className={css.list}>
      {notes.map(note => {
        const { id, title, content, tag } = note;
        return (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button className={css.button} onClick={() => deleteTodoMutation(id)}>Delete</button>
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default NoteList;
