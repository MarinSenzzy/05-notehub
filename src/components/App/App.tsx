import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";

function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["note", search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
    console.log("work");
  }, 800);

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox search={handleSearch} />}
          {isSuccess && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              page={page}
              setPage={setPage}
            />
          )}

          {
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
          }
        </header>
        {isLoading && <div>Loading posts...</div>}
        {isError && (
          <>
            <div>Something wrong...</div>
            {/* <p>{error.message}</p> */}
          </>
        )}
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isSuccess && data.notes.length === 0 && (
          <p>No movies found for your request.</p>
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
