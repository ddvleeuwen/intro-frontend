import { Challenge } from "../../model/challenge.tsx";
import { FormEvent, ReactElement, useState } from "react";
import { uploadChallenge } from "../../services/challenge.service.tsx";
import { IconFaceId, IconFaceIdError, IconLoader } from "@tabler/icons-react";

type CrazyChallengeProps = {
  item: Challenge;
  refetch: () => void;
}

type CrazyChallengeState = {
  icon: ReactElement;
  text: string;
  className: string;
}

const CrazyChallenge = (props: CrazyChallengeProps) => {
  const [ percentage, setPercentage ] = useState(0);
  const [ uploading, setUploading ] = useState(false);
  const [ error, setError ] = useState<string | undefined>(undefined);

  const uploadFile = (e: FormEvent, challenge: Challenge) => {
    const formData = new FormData((e.target as HTMLElement).parentElement as HTMLFormElement);
    setUploading(true);

    uploadChallenge(challenge, formData, setPercentage).then(() => {
      setUploading(false);
      setError(undefined);
    }).catch((error) => {
      console.log(error);
      setUploading(false);
      setPercentage(0);
      setError("Something went wrong while uploading your submission... Please try again later.")
    }).finally(() => {
      props.refetch();
    });
  }

  const getMessage = () => {
    if (error) {
      return "Error...";
    } else if (percentage > 0) {
      return uploading? "Uploading... " + percentage + "%" : "Submitted!";
    } else {
      return `Submit ${props.item.state? " again" : ""} (#${props.item.id})`;
    }
  }

  const getState = (state: string): CrazyChallengeState | undefined => {
    switch (state) {
      case "PENDING":
        return {
          icon: <IconLoader size="18px" className="animate-spin"/>,
          text: "in review",
          className: "bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200"
        }
      case "APPROVED":
        return {
          icon: <IconFaceId size="18px"/>,
          text: "goedgekeurd",
          className: "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200"
        }
      case "DENIED":
        return {
          icon: <IconFaceIdError size="18px"/>,
          text: "afgekeurd",
          className: "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200"
        }
    }
  }

  const state = getState(props.item.state);

  const denialReason = props.item.state === "DENIED" ? props.item.deniedReason : undefined;

  return (
    <>
      <article>
        <div className="flex justify-between items-top">
          <div className="flex sm:items-center max-sm:flex-col gap-2">
            <h2 className="text-xl font-bold">
              #{props.item.id} {props.item.title}
            </h2>
            <div className={`text-sm rounded-full px-3 flex gap-1 items-center w-fit ${state?.className}`}>
              {state?.icon}
              {state?.text}
            </div>
          </div>
          <p className="text-xl font-extrabold">{props.item.points}</p>
        </div>
        <p className="pt-2 text-sm font-bold">Beschrijving</p>
        <p>{props.item.challenge}</p>
        <form id={"form-" + props.item.id} onChange={(event) => uploadFile(event, props.item)}>
          <label
            htmlFor={"file-selector-" + props.item.id}
            className={`relative w-full mt-2 py-2 px-4 flex items-center cursor-pointer justify-center rounded-lg bg-bg-primary text-txt-primary border-2 border-border dark:bg-dark-bg-primary dark:text-dark-txt-primary dark:border-dark-border ${denialReason ? "rounded-b-none" : ""}`}
          >
            <div style={{ width: `calc(100%*${(percentage > 0 ? (uploading ? percentage / 100 : 1) : 1)})` }}
                 className={`transition-all absolute left-0 h-full flex items-center cursor-pointer justify-center rounded-md bg-primary text-txt-contrast border-2 border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border ${denialReason ? "rounded-b-none" : ""}`}/>
            <div className="relative">
              {getMessage()}
            </div>
          </label>
          <input id={"file-selector-" + props.item.id} type="file" name="files" className="hidden"/>
        </form>
        {(denialReason || error) && (
          <p className="rounded-b-md px-2 py-1 font-bold italic text-sm bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200">
            {error ?? denialReason}
          </p>
        )}
      </article>
      <hr className="my-4 border-border"/>
    </>
  );
}

export default CrazyChallenge;
