"use client"

import Heading from "@/app/components/Heading";
import React, {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";
import { RiLoginBoxLine } from "react-icons/ri";
import { GiPillDrop } from "react-icons/gi";
interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        },
    });

    useEffect(() => {
        if (currentUser) {
            router.push("/cart")
            router.refresh();
        }
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                router.push('/cart');
                router.refresh();
                toast.success('Zalogowano!')
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    if (currentUser) { return <p className="text-center">Zalogowano. Przekierowuje...</p> }

    return (
        <div className="flex w-full items-center align-center justify-between">
            <div className="w-[40%] max-md:text-xs max-md:flex max-md:flex-col max-md:w-full">
                <div className="flex items-center gap-3">
                    <Heading title="Zaloguj się"/>
                    <RiLoginBoxLine size={40} />
                </div>
                <div className="py-4"></div>
                <Input
                    id="email"
                    label="E-mail"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <div className="py-4"></div>
                <Input
                    id="password"
                    label="Hasło"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    type="password"
                />
                <div className="py-4"></div>
                <Button label={isLoading ? "Ładowanie..." : "Zaloguj się"} onClick={handleSubmit(onSubmit)}/>


                <div className="flex flex-col items-center pt-6">
                    <p className="text-xl pb-6">LUB</p>
                    <Button outline label="Zaloguj się z Google" icon={AiOutlineGoogle} onClick={() => {signIn('google')}}/>
                </div>
                <p className="text-sm pt-6">
                    Nie posiadasz konta? <Link className="underline" href="/register">
                    Zarejestruj się
                </Link>
                </p>
            </div>
            <div className="text-6xl text-gray-300 w-[60%] text-center flex flex-col items-center gap-y-4 max-md:text-lg">SUPLEMENTARNIA <GiPillDrop size={200}/></div>

        </div>
    );
};
export default LoginForm;