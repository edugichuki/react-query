import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroData = async ({ queryKey }) => {
  const heroId = queryKey[1];
  const response = await axios.get(
    `http://localhost:4000/superheroes/${heroId}`
  );
  return response.data;
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["superHero", heroId],
    queryFn: fetchSuperHeroData,
  });
};
