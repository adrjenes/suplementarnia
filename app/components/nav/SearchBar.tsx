"use client"
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import queryString from "query-string";


function SearchBar({ placeholder}) {
    const router = useRouter();
    const [wordEntered, setWordEntered] = useState("");
    const [style, setStyle] = useState("");
    const [iconColor, setIconColor] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!data.searchTerm) return router.push('/');
        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, {skipNull: true})
        console.log(url)
        router.push(url)
        clearInput()
        reset()
    }

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
                <input {...register('searchTerm')} type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}
                    className="focus:bg-white rounded-l-md text-md p-4 h-10 w-75 outline-none"
                />

                        <button onClick={handleSubmit(onSubmit)} className="h-15 w-12 bg-white flex items-center justify-center w-6 pr-2">
                        <SearchIcon className={`text-4xl ${iconColor}`}/>
                        </button>
                {wordEntered.length !== 0 && (
                    <button className="h-15 bg-white flex items-center justify-center pr-1">
                        <CloseIcon id="clearBtn" onClick={clearInput} className={`text-4xl cursor-pointer ${iconColor}`} />
                    </button>
                )}
            </div>
        </div>
    );
}
export default SearchBar;