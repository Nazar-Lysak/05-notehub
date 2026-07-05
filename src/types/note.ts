export interface Note {
    id: string;
    createAt: Date;
    cupdatedAt: Date;
    content: string;
    tag: NoteTag;
    title: string;
}

export type NoteTag = "Todo" | "Work" | "Shopping" | "Personal" | "Meeting";