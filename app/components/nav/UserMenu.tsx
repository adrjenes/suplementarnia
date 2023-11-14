"use client";

import React, {useCallback, useState} from "react";
import Avatar from "@/app/components/Avatar";
import {AiFillCaretDown} from "react-icons/ai";
import Link from "next/link";
import MenuItem from "@/app/components/nav/MenuItem";
import {signOut} from "next-auth/react";
import BackDrop from "@/app/components/nav/BackDrop";
import {SafeUser} from "@/types";
import {FaUser} from "react-icons/fa";

interface UserMenuProps {
    currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    return (
        <>
            <div className="relative z-30">
                <div onClick={toggleOpen} className="p-2 border-[2px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 hover:text-green-700 hover:border-green-600">
                    {currentUser === null ? <div className="text-xs text-center flex gap-1"><FaUser size={20}/><p className="pt-0.5">Użytkownik</p></div> : <p className="text-xs">{currentUser?.name}</p> }

                    <AiFillCaretDown/>
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer">
                        {currentUser ?
                            <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>
                                        Zamówienia
                                    </MenuItem>
                                </Link>
                                {currentUser.role === 'ADMIN' ?
                                    <Link href="/admin">
                                        <MenuItem onClick={toggleOpen}>
                                            Admin panel
                                        </MenuItem>
                                    </Link> :
                                    ""
                                }
                                <hr/>
                                <MenuItem onClick={() => {
                                    toggleOpen();
                                    signOut();
                                }}
                                >
                                    Wyloguj
                            </MenuItem>
                        </div>
                            :
                            <div>
                                <Link href="/login">
                                    <MenuItem onClick={toggleOpen}>
                                        <a>Zaloguj</a>
                                    </MenuItem>
                                </Link>
                                <Link href="/register">
                                    <MenuItem onClick={toggleOpen}>
                                        Zarejestruj
                                    </MenuItem>
                                </Link>
                            </div>
                        }
                    </div>
                )}
            </div>
            {isOpen ? <BackDrop onClick={toggleOpen}/> : null}
        </>
    )
}
export default UserMenu;