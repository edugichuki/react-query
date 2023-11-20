import { Link, Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            <li>
              <Link to="/parallel-queries">Parallel Queries</Link>
            </li>
            <li>
              <Link to="/dynamic-parallel-queries"> Dynamic Parallel</Link>
            </li>
            <li>
              <Link to="/dependent-queries"> Dependent queries</Link>
            </li>
            <li>
              <Link to="/paginated-queries"> Paginated queries</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
