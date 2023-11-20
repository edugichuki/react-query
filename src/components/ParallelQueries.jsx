import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  const data = response.data;
  return data;
};

const fetchSuperVillains = async () => {
  const response = await axios.get("http://localhost:4000/supervillains");
  const data = response.data;
  return data;
};

export const ParallelQueries = () => {
  const { data: superheroes } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });
  console.log(superheroes);

  const { data: supervillains } = useQuery({
    queryKey: ["super-villains"],
    queryFn: fetchSuperVillains,
  });

  return (
    <>
      {supervillains?.map((supervillain) => {
        return <div key={supervillain.name}>{supervillain.name}</div>;
      })}
    </>
  );
};
