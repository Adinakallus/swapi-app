import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import type { Person } from "../../util/types";
import { getPersonDetails } from "../../services/swapi";
import layout from "../../styles/MainLayout.module.css";

type SpeciesResponse = {
  name: string;
};

export const PersonDetails: React.FC = () => {
  const { id } = useParams();
  const personURL = id ? getPersonDetails(Number(id)) : "";
  const { data: person, loading, error } = useFetch<Person>(personURL);
  const speciesUrl = person?.species?.[0];
  const {
    data: speciesData,
    loading: speciesLoading,
    error: speciesError,
  } = useFetch<SpeciesResponse>(speciesUrl || "");

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={`${layout.wrapper} alert alert-danger text-center mt-5`}>
        Error loading character: {error}
      </div>
    );

  return (
    <div
      className="min-vh-100 py-4"
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className={layout.wrapper}>
        <div className="card shadow-lg rounded-4">
          <div className="card-header bg-yellow fs-4 fw-bold">
            {person?.name}
          </div>
          <div className="card-body px-4 py-3">
            <p>
              <strong>Birth Year:</strong> {person?.birth_year}
            </p>
            <p>
              <strong>Gender:</strong> {person?.gender}
            </p>
            <p>
              <strong>Height:</strong> {person?.height} cm
            </p>
            <p>
              <strong>Mass:</strong> {person?.mass} kg
            </p>
            <p>
              <strong>Species:</strong>{" "}
              {speciesLoading ? (
                <span className="spinner-border spinner-border-sm text-warning" />
              ) : speciesError ? (
                "Error loading species"
              ) : (
                speciesData?.name || "No species found."
              )}
            </p>
            <p>
              <strong>Hair Color:</strong> {person?.hair_color}
            </p>
            <p>
              <strong>Skin Color:</strong> {person?.skin_color}
            </p>
            <p>
              <strong>Eye Color:</strong> {person?.eye_color}
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Link to="/" className="btn btn-yellow">
            Back to All Characters
          </Link>
        </div>
      </div>
    </div>
  );
};
