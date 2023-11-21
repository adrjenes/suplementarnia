"use client"
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder}) {

    const [wordEntered, setWordEntered] = useState("");
    const [style, setStyle] = useState("");
    const [iconColor, setIconColor] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };


    const clearInput = () => setWordEntered("");

    return (
        <div className="flex">
            <div className={`flex flex-1 border-[2px] ${style} border-green-600 hover:shadow-md`}
                 onMouseEnter={() => {
                     setStyle("border-[3px]")
                     setIconColor("text-green-700")
                 }}
                 onMouseLeave={() => {
                     setStyle("")
                     setIconColor("")
                 }}
            >
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}
                    className="focus:bg-white rounded-l-md text-md p-4 h-10 w-75 outline-none"
                />
                <div className="h-15 w-12 bg-white flex items-center justify-center">
                    {wordEntered.length === 0 ? (
                        <SearchIcon className={`text-4xl ${iconColor}`}/>
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} className={`text-4xl cursor-pointer ${iconColor}`} />
                    )}
                </div>
            </div>
        </div>
    );
}
export default SearchBar;