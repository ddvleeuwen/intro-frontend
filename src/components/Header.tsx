import { actionRoute, buttonRoutes, RouteType } from "../routes.tsx";
import { Link } from "react-router-dom";
import { cst } from "../constants.tsx";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type HeaderProps = {
  routes: RouteType[];
  actionRoute: RouteType | undefined;
  setSidebarHidden: (hidden: boolean) => void;
}

const Header = (props: HeaderProps) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    function checkLoggedIn() {
      const item = localStorage.getItem('token')
      setLoggedIn(!!item)
    }

    window.addEventListener('storage', checkLoggedIn)

    return () => {
      window.removeEventListener('storage', checkLoggedIn)
    }
  }, []);

  return (
    <header className="w-full p-6 flex justify-between items-center bg-bg-primary border border-border rounded-xl shadow-3d-md dark:bg-dark-bg-primary dark:border-dark-border">
      {loggedIn}
      <div className="flex gap-8 justify-center">
        <div className="flex gap-4 items-center">
          <img src={cst.logo} alt="React Logo" className="w-6 h-6"/>
          <p className="text-xl">
            {cst.title}
          </p>
        </div>
        <nav className="flex items-center max-md:hidden">
          <ol className="flex gap-6 items-center">
            {props.routes.map((route, index) => (
              <li key={index}>
                <Link
                  to={route.path}
                  className="flex gap-1 items-center text-txt-secondary dark:text-dark-txt-secondary"
                >
                  <div aria-hidden>{route.icon}</div>
                  {route.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-4 max-sm:hidden">
          {actionRoute && (
            <Link
              to={actionRoute.path}
              className="p-1 px-4 flex gap-2 items-center rounded-full bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border"
            >
              <div aria-hidden>{actionRoute.icon}</div>
              {actionRoute.name}
            </Link>
          )}
        </div>
        <button
          className="flex justify-center items-center h-9 w-9 rounded-full text-txt-secondary dark:text-dark-txt-secondary hover:bg-stone-200 f2ocus:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800 md:hidden"
          title="Open Sidebar Menu"
          onClick={() => props.setSidebarHidden(false)}
        >
          <IconMenu2/>
        </button>
        {buttonRoutes(loggedIn).map((buttonRoute, index) => (
          <Link
            className="flex justify-center items-center h-9 w-9 rounded-full text-txt-secondary dark:text-dark-txt-secondary hover:bg-stone-200 f2ocus:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800 max-sm:hidden"
            title={buttonRoute.name}
            to={buttonRoute.path}
            key={index}
          >
            <div aria-hidden>{buttonRoute.icon}</div>
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header;
