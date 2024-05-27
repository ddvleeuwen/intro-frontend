import { Link } from "react-router-dom";
import { useState } from "react";
import BingoPage from "./BingoPage.tsx";
import CrazyPage from "./CrazyPage.tsx";

const TeamOverviewPage = () => {
  const queryParameters = new URLSearchParams(window.location.search)
  const page = queryParameters.get("page")
  const [ isRight, setIsRight ] = useState(page == "bingo");

  console.log("RERENDERED")

  return (
    <div>
      <nav className="relative m-auto bg-bg-primary dark:bg-dark-bg-primary w-fit rounded-full border-border dark:border-dark-border border shadow-3d-sm">
        <div className={`absolute top-0 w-28 rounded-full bg-primary dark:bg-dark-primary border-primary-border dark:border-dark-primary-border border-2 h-full transition-all ${isRight ? "ml-24" : ""}`}></div>
        <ul className="relative flex gap-4 py-2 px-4 items-center">
          <li className={`w-20 text-center ${isRight ? "text-txt-secondary dark:text-dark-txt-secondary" : "text-txt-contrast dark:text-dark-txt-contrast"}`}>
            <Link to="?page=crazy88" onClick={() => setIsRight(false)}>Crazy 88</Link>
          </li>
          <li className={`w-20 text-center ${isRight ? "text-txt-contrast dark:text-dark-txt-contrast" : "text-txt-secondary dark:text-dark-txt-secondary"}`}>
            <Link to="?page=bingo" onClick={() => setIsRight(true)}>Bingo</Link>
          </li>
        </ul>
      </nav>
      <div className="mt-8">
        {isRight ? <BingoPage/> : <CrazyPage/>}
      </div>
    </div>
  );
}

export default TeamOverviewPage;
