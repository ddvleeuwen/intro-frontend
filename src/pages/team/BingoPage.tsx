import { useEffect } from "react";
import { setSubTitle } from "../../utils/title.tsx";

const BingoPage = () => {
  useEffect(() => setSubTitle('Bingo'), []);

  return <div>BingoPage</div>;
}

export default BingoPage;
