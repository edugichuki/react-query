import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { DependentQueries } from "./components/DependentQueries";
import { DynamicParallelQueries } from "./components/DynamicParallelQueries";
import HomePage from "./components/HomePage";
import { InfiniteQueries } from "./components/InfiniteQueries";
import { PaginatedQueries } from "./components/PaginatedQueries";
import { ParallelQueries } from "./components/ParallelQueries";
import { RQSuperHeroPage } from "./components/RQSuperHeroPage";
import RQSuperHeroesPage from "./components/RQSuperHeroesPage";
import SuperHeroesPage from "./components/SuperHeroesPage";
import { RootLayout } from "./layouts/RootLayout";
import { SuperHeroLayout } from "./layouts/SuperHeroLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="super-heroes" element={<SuperHeroesPage />} />
      <Route path="rq-super-heroes" element={<SuperHeroLayout />}>
        <Route index element={<RQSuperHeroesPage />} />
        <Route path=":id" element={<RQSuperHeroPage />} />
      </Route>
      <Route path="parallel-queries" element={<ParallelQueries />} />
      <Route
        path="dynamic-parallel-queries"
        element={<DynamicParallelQueries heroIds={[1, 3]} />}
      />
      <Route
        path="dependent-queries"
        element={<DependentQueries email="vishwash@example.com" />}
      />
      <Route path="paginated-queries" element={<PaginatedQueries />} />
      <Route path="infinite-queries" element={<InfiniteQueries />} />
    </Route>
  )
);

//? create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    //? provide a client to the App
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
