import { useEffect, useState } from "react";
import { setSubTitle } from "../../utils/title.tsx";
import { Picture } from "../../model/picture.tsx";
import { getPictures } from "../../services/picture.service.tsx";
import BingoPicture from "../../components/picture/BingoPicture.tsx";
import BingoThumbnail from "../../components/picture/BingoThumbnail.tsx";

const BingoPage = () => {
  useEffect(() => setSubTitle('Bingo'), []);

  const[ pictures, setPictures ] = useState<Picture[]>([]);

  useEffect(() => {
    getPictures().then((response) => {
      setPictures(response.data);
    });
  }, []);

  const refetch = () => {
    getPictures().then((response) => {
      setPictures(response.data);
    });
  }

  type ChallengeState = 'PENDING' | 'APPROVED' | 'DENIED';

  // map of percentage of challenges completed by state (APPROVED, PENDING, DENIED)
  const completedPictures = pictures.reduce<Record<ChallengeState, number>>((acc, challenge) => {
    if (!acc[ challenge.state ]) {
      acc[ challenge.state ] = 0;
    }
    acc[ challenge.state ] += 20;
    return acc;
  }, {} as Record<ChallengeState, number>);

  const totalPoints = pictures.length * 20;

  return (
      <div>
        <div className="w-full mb-8 flex flex-col gap-2">
          <div
              className="w-full flex h-2 rounded-full overflow-hidden shadow-3d-sm border-border dark:border-dark-border border bg-bg-primary dark:bg-dark-bg-primary">
            <div className="bg-emerald-400"
                 style={{width: `${completedPictures.APPROVED / totalPoints * 100}%`}}></div>
            <div className="bg-stone-200" style={{width: `${completedPictures.PENDING / totalPoints * 100}%`}}></div>
            <div className="bg-red-500" style={{width: `${completedPictures.DENIED / totalPoints * 100}%`}}></div>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col items-start w-24">
              <b>goedgekeurd</b>
              <p>{completedPictures.APPROVED ?? 0} punten</p>
            </div>
            <div className="flex flex-col items-center">
              <b>in review</b>
              <p>{completedPictures.PENDING ?? 0} punten</p>
            </div>
            <div className="flex flex-col items-end w-24">
              <b>afgekeurd</b>
              <p>{completedPictures.DENIED ?? 0} punten</p>
            </div>
          </div>
        </div>

        <div
            className="grid grid-cols-5 grid-rows-5 w-full overflow-hidden bg-bg-primary border border-border rounded-xl shadow-3d-md dark:bg-dark-bg-primary dark:border-dark-border"
        >
          {pictures.map((picture) => (
              <BingoThumbnail key={picture.id} item={picture}/>
          ))}
        </div>

        <div className="mt-8">
          {pictures.map((picture) => (
              <BingoPicture key={picture.id} item={picture} refetch={refetch}/>
          ))}
        </div>
      </div>
  )
}

export default BingoPage;
