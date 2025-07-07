import { useRef, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import type { Person, SWAPIResult } from "../util/types";
import { getPeople, getAllPeople } from "../services/swapi";
import { PersonCard } from "../components/PersonCard";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";
import style from "../styles/MainLayout.module.css";

type Props = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

export const HomePage: React.FC<Props> = ({ toggleTheme, isDarkMode }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const isSearching = searchQuery.trim().length > 0;

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data, loading, error, refetch } = useFetch<SWAPIResult<Person>>(
    getPeople(page)
  );

  //Fetch full list for search
  useEffect(() => {
    getAllPeople().then(setPeople).catch(console.error);
  }, []);

  //Set total pages when data loads
  useEffect(() => {
    if (data?.count) {
      setTotalPages(Math.ceil(data.count / 10));
    }
  }, [data?.count]);

  //Scroll to top on page change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const handleSearch = () => {
    setSearchQuery(inputValue.trim());
    setPage(1);
  };

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center pt-4"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3 px-2">
          <h1 className="text-yellow mb-0 fs-3">Star Wars App</h1>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-theme btn-sm" onClick={refetch}>
              Refresh
            </button>
            <button
              className="btn btn-outline-theme btn-sm"
              onClick={toggleTheme}
            >
              {isDarkMode ? "Light" : " Dark"}
            </button>
          </div>
        </div>

        {data?.count && (
          <p className="text-end small px-2">Total Characters: {data.count}</p>
        )}

        <SearchBar
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSearch={handleSearch}
        />

        {isSearching ? (
          <div className={`${style.scrollContainer} mt-3`}>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((person) => (
                <PersonCard key={person.url} {...person} />
              ))
            ) : (
              <div>No results found.</div>
            )}
            <div className="w-100 d-flex justify-content-center mt-3">
              <button
                className="btn btn-yellow"
                onClick={() => {
                  setSearchQuery("");
                  setInputValue("");
                }}
              >
                Back to All Characters
              </button>
            </div>
          </div>
        ) : (
          <div className={`${style.scrollContainer}`}>
            <div
              ref={scrollRef}
              className="mt-3"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              {loading && (
                <div className="d-flex justify-content-center align-items-center py-5">
                  <div className="spinner-border text-warning" role="status" />
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center">
                  <p className="mb-2">Error fetching characters</p>
                  <p className="small fst-italic">{error}</p>
                  <button onClick={refetch} className="btn btn-yellow mt-2">
                    Try Again
                  </button>
                </div>
              )}
              <ul className="p-0 m-0 list-unstyled">
                {data?.results?.map((person) => (
                  <PersonCard key={person.url} {...person} />
                ))}
              </ul>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
