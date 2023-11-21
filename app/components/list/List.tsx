"use client"
import React from 'react';
import Container from '@/app/components/Container';
import {AiFillCaretDown} from "react-icons/ai";
const clas = "flex-1 text-center flex items-center justify-center gap-1 text-white border-r border-green-600 hover:bg-green-700"
const List = () => {

    return <>
        <div className="sticky top-0 bg-green-500 w-full z-20">
            <Container>
                <div className="flex justify-between text-center">
                    <div className={`${clas} h-[70px] border-x`}> Kategorie <AiFillCaretDown className="text-white"/> </div>
                    <div className={`${clas}`}> Producenci <AiFillCaretDown className="text-white"/> </div>
                    <div className={`${clas}`}> Atlas ćwiczeń </div>
                    <div className={`${clas}`}> Kalkulator BMI </div>
                    <div className={`${clas}`}> Kategorie 5 <AiFillCaretDown className="text-white"/> </div>
                    <div className={`${clas}`}> Kategorie 6 <AiFillCaretDown className="text-white"/></div>
                </div>
            </Container>
        </div>
    </>;
};

export default List;