import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const fetchSuperHero = async (heroId) => {
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`
  );
  const data = response.data;
  return data;
};

export const DynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries({
    queries: heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    }),
  });

  console.log({ queryResults });

  return <div>DynamicParallelQueries</div>;
};

DynamicParallelQueries.propTypes = {
  heroIds: PropTypes.arrayOf(PropTypes.number),
};
