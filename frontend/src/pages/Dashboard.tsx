import { css } from "@emotion/css";

import { useState, useEffect } from "react";

import { axiosPrivate } from "../apis/AxiosPrivate";

// Components
import Pagination from "@mui/material/Pagination";
import NoteModal from "../components/notes/NoteModal";

// Icons
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  interface NoteType {
    id: number;
    authorId: number;
    title: string;
    content: string;
  }
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [toggleNoteModal, setToggleNoteModal] = useState(false);

  function onToggleNoteModal() {
    setToggleNoteModal((prev) => !prev);
  }

  async function loadNotes() {
    try {
      const { data } = await axiosPrivate.get(`/note/get?page=${page}`);
      if (data.success) {
        setNotes(data.notes);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      throw error;
    }
  }

  async function deleteNote(id: number) {
    try {
      const { data } = await axiosPrivate.delete(`/note/delete/${id}`);
      if (data.success) {
        loadNotes();
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadNotes(); // load notes
  }, []);

  useEffect(() => {
    loadNotes();
  }, [page]); // load notes when page change

  return (
    <div
      className={css`
        margin-top: 80px;
      `}
    >
      {toggleNoteModal && (
        <NoteModal onClose={onToggleNoteModal} onComplete={loadNotes} />
      )}
      <button
        onClick={onToggleNoteModal}
        className={css`
          line-height: 0;
          background-color: dodgerblue;
          color: white;
          font-size: 25px;
          padding: 10px;
          border: none;
          border-radius: 50%;
          position: absolute;
          bottom: 25px;
          right: 25px;
          cursor: pointer;
          &:hover {
            background-color: #0b6fcd;
          }
        `}
      >
        <AiOutlinePlus />
      </button>
      <div
        className={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        `}
      >
        {notes &&
          notes.map((note) => (
            <div
              className={css`
                background-color: dodgerblue;
                color: white;
                margin: 5px;
                padding: 20px 5px 5px 5px;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
              `}
            >
              <div
                className={css`
                  position: absolute;
                  right: 0;
                  top: 0;
                `}
              >
                <button
                  className={css`
                    background-color: red;
                    color: white;
                    line-height: 0;
                    font-size: 18px;
                    padding: 5px;
                    border: none;
                    cursor: pointer;
                  `}
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  <MdDelete />
                </button>
                <button
                  className={css`
                    background-color: green;
                    color: white;
                    line-height: 0;
                    font-size: 18px;
                    padding: 5px;
                    border: none;
                    cursor: pointer;
                  `}
                >
                  <MdEdit />
                </button>
              </div>
              <div
                className={css`
                  font-weight: 900;
                  font-size: 22px;
                `}
              >
                {note.title}
              </div>
              <div
                className={css`
                  font-size: 16px;
                `}
              >
                {note.content}
              </div>
            </div>
          ))}
      </div>
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Pagination
          page={page}
          count={totalPages}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            setPage(page);
          }}
          color="primary"
        />
      </div>
    </div>
  );
}
