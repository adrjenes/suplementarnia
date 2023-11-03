"use client"

import Heading from "@/app/components/Heading";
import {useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });


    return (
        <>
            <Heading title="Zaloguj się"/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input
                id="name"
                label="Nazwa użytkownika"
                disabled={isLoading}
                register={errors}
                required
            />
        </>
    );
}
export default RegisterForm;