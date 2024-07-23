import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Headline = () => {
  return (
    <div id="headline" className="w-full flex flex-col items-center text-center my-8 max-sm:mt-0">
      <h1 className="font-extrabold text-6xl max-w-[640px] max-sm:text-4xl">
        Maak kennis met Indicium en de HU
      </h1>
      <p className="text-xl text-txt-secondary dark:text-dark-txt-secondary mt-8 w-96 max-w-full max-md:text-lg">
        Deze website is jouw portaal voor het "Crazy88" spel.
        Waarbij je 88 opdrachten moet voltooien om de HU beter te leren kennen.
      </p>
      <Link
        className="shadow-3d-md flex gap-2 mt-8 p-4 px-8 rounded-full bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border"
        to="/team"
      >
        Begin het spel
        <IconArrowRight></IconArrowRight>
      </Link>
    </div>
  );
}

export default Headline;
