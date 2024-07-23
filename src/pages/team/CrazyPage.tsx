import { useEffect, useState } from "react";
import { getChallenges } from "../../services/challenge.service.tsx";
import { Challenge } from "../../model/challenge.tsx";
import CrazyChallenge from "../../components/crazy/CrazyChallenge.tsx";
import { setSubTitle } from "../../utils/title.tsx";

const CrazyPage = () => {
  useEffect(() => setSubTitle('Crazy88'), []);

  const [ challenges, setChallenges ] = useState<Challenge[]>([]);

  useEffect(() => {
    getChallenges().then((response) => {
      setChallenges(response.data);
    });
  }, []);

  const refetch = () => {
    getChallenges().then((response) => {
      setChallenges(response.data);
    });
  }

  type ChallengeState = "PENDING" | "APPROVED" | "DENIED";

  // map of percentage of challenges completed by state (APPROVED, PENDING, DENIED)
  const completedChallenges = challenges.reduce<Record<ChallengeState, number>>((acc, challenge) => {
    if (!acc[ challenge.state ]) {
      acc[ challenge.state ] = 0;
    }
    acc[ challenge.state ] += challenge.points;
    return acc;
  }, {} as Record<ChallengeState, number>);

  const totalPoints = challenges.reduce((acc, challenge) => acc + challenge.points, 0);

  return (
    <div>
      <div className="w-full mb-8 flex flex-col gap-2">
        <div className="w-full flex h-2 rounded-full overflow-hidden shadow-3d-sm border-border dark:border-dark-border border bg-bg-primary dark:bg-dark-bg-primary">
          <div className="bg-emerald-400" style={{ width: `${completedChallenges.APPROVED / totalPoints * 100}%` }}></div>
          <div className="bg-stone-200" style={{ width: `${completedChallenges.PENDING / totalPoints * 100}%` }}></div>
          <div className="bg-red-500" style={{ width: `${completedChallenges.DENIED / totalPoints * 100}%` }}></div>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex flex-col items-start w-24">
            <b>goedgekeurd</b>
            <p>{completedChallenges.APPROVED ?? 0} punten</p>
          </div>
          <div className="flex flex-col items-center">
            <b>in review</b>
            <p>{completedChallenges.PENDING ?? 0} punten</p>
          </div>
          <div className="flex flex-col items-end w-24">
            <b>afgekeurd</b>
            <p>{completedChallenges.DENIED ?? 0} punten</p>
          </div>
        </div>
      </div>

      {challenges.map((item) => <CrazyChallenge refetch={refetch} key={item.id} item={item}/>)}
    </div>
  );
}

export default CrazyPage;
