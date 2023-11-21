import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

const addSuperHero = (hero) => {
  const response = axios.post("http://localhost:4000/superheroes", hero);
  const data = response.data;
  return data;
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["superHeroes"],
    queryFn: fetchSuperHeroes,
    onSuccess: (data) => {
      console.log("Data fetching succeeded!", data);
    },
    onError: (error) => {
      console.error("Error during data fetching:", error);
    },

    //? react-query-data-transformations using the select option
    // select: (data) => {
    //   const superHeroNames = data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["superHeroes"] });
      // queryClient.setQueriesData(["superHeroes"], (oldQUeryData) => {
      //   return {
      //     ...oldQUeryData,
      //     data: [...oldQUeryData.data, data.data],
      //   };
      // });
    },
  });
};
