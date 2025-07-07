import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type PersonCardProps = {
  name: string;
  birth_year: string;
  species: string[] | null;
  url: string;
};

type SpeciesResponse = {
  name: string;
};

export const PersonCard: React.FC<PersonCardProps> = ({
  name,
  birth_year,
  species,
  url,
}) => {
  const speciesUrl = species && species.length > 0 ? species[0] : null;
  const id = url.split("/").filter(Boolean).pop();

  const { data, loading, error } = useFetch<SpeciesResponse>(speciesUrl || "");

  return (
    <Link to={`/character/${id}`} className="text-decoration-none">
      <div className="card mx-auto shadow-sm mb-2 w-100">
        <div className="card-header bg-yellow fs-8 fw-semibold">{name}</div>
        <div className="card-body">
          <p className="mb-2">
            <strong>Birth year:</strong> {birth_year}
          </p>
          {speciesUrl && (
            <div className="mb-2">
              <strong>Species: </strong>{" "}
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm text-warning"
                  role="status"
                />
              ) : error ? (
                "Error loading species"
              ) : (
                data?.name
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
