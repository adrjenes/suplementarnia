import Image from "next/image";
import React from "react";
import {FaUser, FaUserCircle} from "react-icons/fa";

interface AvatarProps {
    src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    if (src) {
        return (
        <Image src={src} alt="Avatar" height="30" width="30"/>
        )
    }
    return <FaUser size={24}/>
}
export default Avatar;