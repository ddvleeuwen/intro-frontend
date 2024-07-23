import Headline from "../components/landing/Headline.tsx";
import { useEffect } from "react";
import { setSubTitle } from "../utils/title.tsx";

const LandingPage = () => {
  useEffect(() => setSubTitle('Meet new people'), []);

  return (
    <div className="flex flex-col">
      <Headline />
    </div>
  );
}

export default LandingPage;
