"use client"

import {ImageType} from "@/app/admin/add-products/AddProductForm";
import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

interface SelectImageProps {
    handleFileChange: (value: File) => void;
    addImageToState: (value: ImageType) => void;
    removeImageFromState: (value: ImageType) => void;
}

const DropImage: React.FC<SelectImageProps> = ({handleFileChange, addImageToState, removeImageFromState}) => {
    const [uploadedImageName, setUploadedImageName] = useState("");
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': ['.jpeg', '.jpg', '.png']} });

    return <div className="flex items-center">
        <div {...getRootProps()} className="border-2 border-slate-400 p-7 border-dashed cursor-pointer text-sm
    font-normal text-slate-400 flex items-center justify-center w-full">
        <input {...getInputProps()}/>
        {isDragActive ? (
            <p>Upuść zdjęcie tutaj...</p>
            ) : (
            uploadedImageName ? <div>{uploadedImageName}</div> : <p>+ Dodaj zdjęcie</p>
            )}
    </div>
        </div>
}
export default DropImage;