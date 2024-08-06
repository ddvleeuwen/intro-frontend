import { getPictureUrl } from "../../services/picture.service.tsx";
import { Picture } from "../../model/picture.tsx";
import { IconFaceId, IconFaceIdError, IconLoader } from "@tabler/icons-react";

type BingoThumbnailProps = {
    item: Picture
}

const BingoThumbnail = (props: BingoThumbnailProps) => {
    // if the bingo picture status is null, the picture should be black and white
    let extraStyles;

    if (props.item.state === 'APPROVED') {
        extraStyles = "filter backdrop-colorize bg-green-500 bg-opacity-75";
    } else if (props.item.state === 'DENIED') {
        extraStyles = "bg-red-500 bg-opacity-75";
    } else {
        extraStyles = "bg-opacity-75 filter backdrop-grayscale backdrop-brightness-50"
    }

    let icon;

    if (props.item.state === 'PENDING') {
        icon = <IconLoader size="32px" className="animate-spin-slow"/>;
    } else if (props.item.state === 'APPROVED') {
        icon = <IconFaceId size="32px"/>;
    } else if (props.item.state === 'DENIED') {
        icon = <IconFaceIdError size="32px"/>;
    }

    return (
        <div>
            <a className={"relative"} href={`#picture-${props.item.id}`}>
                <div className={"absolute h-full w-full text-white flex items-center justify-center " + extraStyles}>
                    {icon}
                </div>
                <img
                    key={props.item.id}
                    src={getPictureUrl(props.item.id, true)}
                    className="w-full aspect-square bg-bg-primary outline outline-2 outline-border dark:bg-dark-bg-primary dark:outline-dark-border"
                    alt="Image showing one of the secret locations"
                />
            </a>
        </div>
    )
}

export default BingoThumbnail;