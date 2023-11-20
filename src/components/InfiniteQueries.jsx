import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchSupervillains = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `http://localhost:4000/supervillains?_limit=1&_page=${pageParam}`
  );
  return response.data;
};

export const InfiniteQueries = () => {
  const {
    isPending,
    isError,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["supervillains"],
    queryFn: fetchSupervillains,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 7) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <>
      <div>
        {isPending ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data?.pages?.map((group, i) => {
              console.log("Group:", group);
              return (
                <Fragment key={i}>
                  {group?.data?.map((supervillain) => (
                    <h2 key={supervillain.id}>{supervillain.name}</h2>
                  ))}
                </Fragment>
              );
            })}
          </div>
        )}
        <div>
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </>
  );
};
