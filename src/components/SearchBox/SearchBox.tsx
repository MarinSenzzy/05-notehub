import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: (val: string) => void;
}

export default function SearchBox({ search }: SearchBoxProps) {
  const handleChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evnt.target.value.trim();
    search(searchText);
  };

  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={handleChange}
      />
    </>
  );
}
