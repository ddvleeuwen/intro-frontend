import { FormEvent, ReactElement, useEffect, useState } from "react";
import { IconFaceId, IconFaceIdError, IconLoader } from "@tabler/icons-react";
import { Picture } from "../../model/picture.tsx";
import { getPictureSubmissionBlob, getPictureUrl, uploadPicture } from "../../services/picture.service.tsx";

type BingoPictureProps = {
    item: Picture;
    refetch: () => void;
}

type BingoPictureState = {
    icon: ReactElement;
    text: string;
    className: string;
}

const BingoPicture = (props: BingoPictureProps) => {
    const [ percentage, setPercentage ] = useState(0);
    const [ uploading, setUploading ] = useState(false);
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ blobUrl, setBlobUrl ] = useState<string | undefined>(undefined);

    const uploadFile = (e: FormEvent, picture: Picture) => {
        const formData = new FormData((e.target as HTMLElement).parentElement as HTMLFormElement);
        setUploading(true);

        uploadPicture(picture, formData, setPercentage).then(() => {
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
        if (props.item.state === 'APPROVED') {
            return "Good job, enjoy the points!"
        }
        if (error) {
            return "Error...";
        } else if (percentage > 0 || props.item.state === 'PENDING') {
            return uploading? "Uploading... " + percentage + "%" : "Submitted!";
        } else {
            return `Submit ${props.item.state ? " again" : ""} (#${props.item.id})`;
        }
    }

    const uploadDisabled = props.item.state === 'APPROVED' || props.item.state === 'PENDING';

    const getState = (state: string): BingoPictureState | undefined => {
        switch (state) {
            case "PENDING":
                return {
                    icon: <IconLoader size="16px" className="animate-spin-slow"/>,
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

    useEffect(() => {
        if(props.item.state === "APPROVED") {
            const submission =  getPictureSubmissionBlob(props.item.id);

            submission.then((blob) => {
                setBlobUrl(URL.createObjectURL(blob.data));
            })
        }
    }, []);

    return (
        <>
            <article id={`picture-${props.item.id}`}>
                <div className="flex justify-between items-top">
                    <div className="flex sm:items-center max-sm:flex-col gap-2">
                        <h2 className="text-xl font-bold">
                            #{props.item.id}
                        </h2>
                        <div className={`text-sm rounded-full px-3 flex gap-1 items-center w-fit ${state?.className}`}>
                            {state?.icon}
                            {state?.text}
                        </div>
                    </div>
                </div>

                {blobUrl ? (
                  <img
                    src={blobUrl}
                    className="w-full min-h-96 mt-2 rounded-md"
                    loading="lazy"
                    alt="Image showing one of the secret locations"
                  />
                ) : (
                  <img
                    src={getPictureUrl(props.item.id, false)}
                    className="w-full min-h-96 mt-2 rounded-md"
                    loading="lazy"
                    alt="Image showing one of the secret locations"
                  />
                )}


                <form id={"form-" + props.item.id} onChange={(event) => uploadFile(event, props.item)}>
                    <label
                        htmlFor={"file-selector-" + props.item.id}
                        className={`relative w-full mt-2 py-2 px-4 flex items-center justify-center rounded-lg bg-bg-primary text-txt-primary border-2 border-border dark:bg-dark-bg-primary dark:text-dark-txt-primary dark:border-dark-border ${(denialReason || error) ? "rounded-b-none" : ""}`}
                    >
                        <div style={{ width: `calc(100%*${(percentage > 0 ? (uploading ? percentage / 100 : 1) : 1)})` }}
                             className={`transition-all absolute left-0 h-full flex items-center justify-center rounded-md ${uploadDisabled ? 'cursor-not-allowed' : 'cursor-pointer bg-primary text-txt-contrast border-primary-border dark:bg-dark-primary dark:text-dark-txt-contrast dark:border-dark-primary-border'} border-2 ${denialReason ? "rounded-b-none" : ""}`}/>
                        <div className={`relative ${uploadDisabled ? 'text-txt-secondary dark:text-dark-txt-secondary' : ''}`}>
                            {getMessage()}
                        </div>
                    </label>
                    <input disabled={uploadDisabled} id={"file-selector-" + props.item.id} type="file" name="file" className="hidden" accept="image/*, video/*"/>
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

export default BingoPicture;
