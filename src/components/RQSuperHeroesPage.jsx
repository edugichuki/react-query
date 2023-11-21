import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");
  const { isPending, error, data } = useSuperHeroesData();

  const { mutate: addHero } = useAddSuperHeroData();
  const handleAddHeroClick = () => {
    console.log({ name, realName });

    const hero = { name, realName };
    addHero(hero);
  };

  if (isPending) return <h2>Loading...</h2>;

  if (error) return <h3>An error has occured: {error.message}</h3>;

  return (
    <>
      <h2>RQ Super Heroes Page</h2>

      <div>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={realName}
          placeholder="real name"
          onChange={(e) => setRealName(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>

      {
        //? optional chaining to prevent jsx from throwing an error if data doesn't exist
        data?.map((hero) => {
          return (
            <div key={hero.id}>
              <Link to={`${hero.id}`}>{hero.name}</Link>
            </div>
          );
        })
      }

      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};

export default RQSuperHeroesPage;
