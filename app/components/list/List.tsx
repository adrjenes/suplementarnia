"use client"
import React, {useState} from 'react';
import Container from '@/app/components/Container';
import {AiFillCaretDown} from "react-icons/ai";
import ListTouch from "@/app/components/list/ListTouch";
import Link from "next/link";
const List = () => {
    const [isHovering, setIsHovering] = useState(false);
    return <>
        <div className="sticky top-0 bg-green-500 w-full z-20">
            <Container>
                <div className="flex justify-between text-center max-sm:text-xs">
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white h-[70px] border-x border-green-600 hover:bg-green-700"
                         onMouseEnter={() => {setIsHovering(true);}}
                         onMouseLeave={() => {setIsHovering(false)}}>
                        Kategorie
                        <AiFillCaretDown className="text-white"/>
                        <div> {isHovering && <ListTouch/>} </div>
                    </div>

                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        <Link href="/atlas">Atlas ćwiczeń</Link>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        <Link href="/calculator">Kalkulator BMI</Link>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        <Link href="/about">O nas</Link>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        <Link href="/contact">Kontakt</Link>
                    </div>
                </div>
            </Container>
        </div>
    </>;
};

export default List;