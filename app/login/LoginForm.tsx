"use client"

import Heading from "@/app/components/Heading";
import React, {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";
import {signIn} from "next-auth/react";
import {callback} from "next-auth/core/routes";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";

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

    if (currentUser) {
        return <p className="text-center">Zalogowano. Przekierowuje...</p>
    }

    return (
        <>
            <Heading title="Zaloguj się"/>
            <Button outline label="Zaloguj się z Google" icon={AiOutlineGoogle} onClick={() => {signIn('google')}}/>
            <hr className="bg-slate-300 w-full h-px"/>
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
                Nie posiadasz konta? <Link className="underline" href="/register">
                Zarejestruj się
            </Link>
            </p>
        </>
    );
};
export default LoginForm;