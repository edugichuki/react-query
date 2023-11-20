import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchSupervillains = async (page) => {
  const response = await axios.get(
    `http://localhost:4000/supervillains?_limit=1&_page=${page}`
  );
  return response.data;
};

export const PaginatedQueries = () => {
  const [page, setPage] = useState(0);

  const { isPending, isError, data, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["supervillains", page],
      queryFn: () => fetchSupervillains(page),
      placeholderData: keepPreviousData,
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
            {data.map((supervillain) => {
              return (
                <div key={supervillain.id}>
                  {supervillain.name} -{supervillain.realName}
                </div>
              );
            })}
          </div>
        )}
        <span>Current Page: {page}</span>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
          //   onClick={() => setPage((old) => Math.max(old - 1, 0))}
          //   disabled={page === 0}
        >
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            setPage((old) => old + 1);
          }}
          //   onClick={() => {
          //     if (!isPlaceholderData && data.hasMore) {
          //       setPage((old) => old + 1);
          //     }
          //   }}
          //? Disable the Next Page button until we know a next page is available
          disabled={page === 7}

          //? disabled={isPlaceholderData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{" "}
      </div>
    </>
  );
};
