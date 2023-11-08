"use client"

import Heading from "@/app/components/Heading";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";
import {signIn} from "next-auth/react";
import {callback} from "next-auth/core/routes";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const LoginForm = () => {
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

    return (
        <>
            <Heading title="Zaloguj się"/>
            <Button outline label="Zaloguj się z Google" icon={AiOutlineGoogle} onClick={() => {
            }}/>
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