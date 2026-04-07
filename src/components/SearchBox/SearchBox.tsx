import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (val: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = evnt.target.value.trim();
    onSearch(searchText);
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
