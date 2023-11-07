"use client"

import Heading from "@/app/components/Heading";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }

    return (
        <>
            <Heading title="Zarejestruj się"/>
            <Button outline label="Zarejestruj się z Google" icon={AiOutlineGoogle} onClick={() => {
            }}/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input
                id="name"
                label="Nazwa użytkownika"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="E-mail"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Hasło"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Ładowanie..." : "Zaloguj się"} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">
                Posiadasz już konto? <Link className="underline" href="/login">
                Zaloguj się
            </Link>
            </p>
        </>
    );
};
export default RegisterForm;