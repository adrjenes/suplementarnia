"use client"
import React, {useState} from 'react';
import Container from '@/app/components/Container';
import {AiFillCaretDown} from "react-icons/ai";
import ListTouch from "@/app/components/list/ListTouch";

const List = () => {
    const [isHovering, setIsHovering] = useState(false);
    return <>
        <div className="sticky top-0 bg-green-500 w-full z-20">
            <Container>
                <div className="flex justify-between text-center">
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white h-[70px] border-x border-green-600 hover:bg-green-700"
                         onMouseEnter={() => {
                             setIsHovering(true);
                    }}
                         onMouseLeave={() => {
                         setIsHovering(false)
                    }
                    }

                    >
                        Kategoria 1
                        <AiFillCaretDown className="text-white"/>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        Kategorie 2
                        <AiFillCaretDown className="text-white"/>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        Kategorie 3
                        <AiFillCaretDown className="text-white"/>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        Kategorie 4
                        <AiFillCaretDown className="text-white"/>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        Kategorie 5
                        <AiFillCaretDown className="text-white"/>
                    </div>
                    <div className="flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700">
                        Kategorie 6
                        <AiFillCaretDown className="text-white"/>
                    </div>
                </div>
            </Container>
        </div>
        <Container>
            <div className="bg-red-500">
            {isHovering && <ListTouch onMouseEvent={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}/>}
            </div>
        </Container>
    </>;
};

export default List;