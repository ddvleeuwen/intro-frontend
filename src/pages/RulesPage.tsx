import { useEffect } from "react";
import { setSubTitle } from "../utils/title.tsx";

const RulesPage = () => {
  useEffect(() => setSubTitle('Rules'), []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl">Welkom in Utrecht!</h1>
      <p>Jullie gaan straks met je groepje een crazy 88 en een fotospeurtocht.</p>
      <p>
        Je groepje krijgt straks 88 unieke opdrachten die gerelateerd zijn aan je studie, de stad en onze geweldige
        studievereniging.<br/>
        Daarnaast krijg je 25 foto's te zien van prachtige en unieke locaties binnen Utrecht; Aan jullie de taak om met
        je groepje een groepsfoto/selfie te maken op deze locaties.
      </p>
      <p>
        Lees voordat jullie beginnen graag de regels even goed door. Ook de papa's & mama's, omdat ze dit jaar zijn
        aangepast!
      </p>

      <h2 className="text-xl">Regels</h2>
      <ul className="list-disc">
        <li>De punten van de crazy 88 en van de fotospeurtocht bij elkaar opgetelt is je uiteindelijke score.</li>
        <li>Bij de fotospeurtocht moet iedereen op de foto staan minus een persoon (degene die de foto maakt).</li>
        <li>Wees juist creatief met je inzendingen, zolang de opdracht correct is uitgevoerd in de ogen van de jury.</li>
        <li>Je groepje is altijd bij elkaar. Zie "Het FC Utrecht fan protocool."</li>
        <li>In het geval dat iemand echt niet op camera wil, notify de jury.</li>
      </ul>
      <span>
        <h2 className="text-lg">Het FC Utrecht fan protocol</h2>
        <b
          className="text-sm text-txt-secondary dark:text-dark-txt-secondary">TLDR: splits niet af van je groepje.
        </b><br/>

      </span>
      <p>
        Afgelopen introkamp hebben we helaas een situatie gehad waarbij een belangrijke regel werd overtreden.<br/>
        Twee PaMa's hadden hun groepje zonder overleg gesplitst, iets wat expliciet tegen de gemaakte afspraken
        ingaat.<br/>
        We hebben duidelijke regels opgesteld om te zorgen dat iedereen veilig blijft en goed samenwerkt, dus dit soort
        acties kunnen we niet negeren.<br/>
        Vanaf nu zullen we naar dit voorval verwijzen als "het incident", en we vragen iedereen om ervan te leren en
        samen verder te kijken naar hoe we deze situaties in de toekomst kunnen voorkomen.<br/>
        <i
          className="text-sm text-txt-secondary dark:text-dark-txt-secondary"
        >
          [* Real story cited by ChatGPT but important nevertheless]
        </i><br/>
      </p>
      <p>
        Het kan zijn dat we een inzending weigeren met als antwoord "FC Utrecht fan protocool", neem dan graag opnieuw
        een foto/video met iedereen erop van je groepje met hun handen in een U-vorm.
      </p>
      <p>
        Bedankt voor jullie begrip en veel plezier!
      </p>
    </div>
  );
}

export default RulesPage;
