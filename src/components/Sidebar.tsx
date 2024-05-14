import {actionRoute, navigation} from "../routes.tsx";
import {Link} from "react-router-dom";
import ThemeSelector from "./ThemeSelector.tsx";
import {IconX} from "@tabler/icons-react";
import {cst} from "../constants.tsx";

export type SidebarProps = {
  setHidden: (hidden: boolean) => void;
  hidden: boolean;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <aside className={`${props.hidden ? 'hidden' : ''} h-full w-full fixed z-30 bg-opacity-30 bg-black flex top-0`}>
      <nav className="flex p-6 justify-between flex-col min-w-80 max-sm:min-w-full h-full bg-bg-primary sm:border-r-2 border-border dark:bg-dark-bg-primary dark:border-dark-border">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between my-4 px-2">
            <div className="flex gap-4 items-center">
              <img src={cst.logo} alt="React Logo" className="w-6 h-6"/>
              <p className="text-xl">
                {cst.title}
              </p>
            </div>
            <button
              className="flex justify-center items-center h-9 w-9 rounded-full text-txt-secondary dark:text-dark-txt-secondary hover:bg-stone-200 f2ocus:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800"
              onClick={() => props.setHidden(true)}
              title="Close Sidebar Menu"
            >
              <IconX/>
            </button>
          </div>

          <hr className="mb-4 border-dashed border border-border"/>

          {navigation.map((route, index) => (
            <Link
              key={index}
              className="flex items-center gap-2 p-4 px-4 rounded-xl bg-bg-primary text-txt-secondary border-2 border-border dark:bg-dark-bg-secondary dark:text-dark-txt-primary dark:border-dark-border"
              to={route.path}
            >
              <div aria-hidden>{route.icon}</div>
              {route.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {actionRoute && (
            <Link
              to={actionRoute.path}
              className="flex items-center gap-2 p-4 px-4 rounded-xl bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border"
            >
              <div aria-hidden>{actionRoute.icon}</div>
              {actionRoute.name}
            </Link>
          )}
          <ThemeSelector large={true}/>
        </div>
      </nav>
      <div className="w-full" onClick={() => props.setHidden(true)}></div>
    </aside>
  );
}

export default Sidebar;
