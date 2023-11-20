import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroPage = () => {
  const { id } = useParams();

  const { isPending, error, data } = useSuperHeroData(id);

  if (isPending) return <h2>Loading...</h2>;

  if (error) return <h3>An error has occured: {error.message}</h3>;
  return (
    <div>
      {data.name} - {data.realName}
    </div>
  );
};
