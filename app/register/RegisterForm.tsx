"use client"

import Heading from "@/app/components/Heading";
import React, {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";
import {RiLoginBoxLine} from "react-icons/ri";
import {GiPillDrop} from "react-icons/gi";

interface RegisterFormProps {
    currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
            router.refresh();
        }
    }, [currentUser, router]);

    const validateUsername = (value) => {
        if (value.length < 3 || value.length > 20) {
            toast.error("Nazwa użytkownika powinna mieć od 3 do 20 znaków");
            return false;
        }
        return true;
    };

    const validateEmail = (value) => {
        if (!value.includes('@') || value.length < 6 || value.length > 30) {
            toast.error("Nieprawidłowy adres e-mail");
            return false;
        }
        return true;
    };

    const validatePassword = (value) => {
        const hasNumber = /\d/;
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!hasNumber.test(value) || !hasSpecialChar.test(value) || value.length < 6 || value.length > 30) {
            toast.error("Hasło musi zawierać znak specjalny, liczbę oraz mieć od 6 do 30 znaków");
            return false;
        }
        return true;
    };

    const onSubmit = (data) => {
        if (!validateUsername(data.name) || !validateEmail(data.email) || !validatePassword(data.password)) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        axios.post("/api/register", data).then(() => {
            toast.success("Konto zostało utworzone");
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    router.push('/cart');
                    router.refresh();
                    toast.success('Zalogowano!')
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
                .catch(()  =>  toast.error("Coś poszło nie tak :/"))
                .finally(() => {
                    setIsLoading(false);
                })
        });
        if (currentUser) {
            return <p className="text-center">Zarejestrowano. Przekierowuje...</p>
        }
    }

    return<div className="flex w-full items-center align-center  justify-between">
                <div className="w-[40%] max-md:text-xs max-md:flex max-md:flex-col max-md:w-full">
                    <div className="flex items-center gap-3">
                        <Heading title="Zarejestruj się"/>
                        <RiLoginBoxLine size={40} />
                    </div>
                    <div className="py-4"></div>
            <Input
                id="name"
                label="Nazwa użytkownika"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
                    <div className="pt-6"/>
            <Input
                id="email"
                label="E-mail"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
                    <div className="pt-6"/>
            <Input
                id="password"
                label="Hasło"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
                    <div className="pt-6"/>
            <Button label={isLoading ? "Ładowanie..." : "Zarejestruj się"} onClick={handleSubmit(onSubmit)}/>
                    <div className="flex flex-col items-center pt-6">
                        <p className="text-xl pb-6">LUB</p>
                        <Button outline label="Kontynuuj z Google" icon={AiOutlineGoogle} onClick={() => {signIn('google')}}/>
                    </div>
            <p className="text-sm pt-6">
                Posiadasz już konto? <Link className="underline" href="/login">
                Zaloguj się
            </Link>
            </p>
                </div>
        <div className="text-6xl text-gray-300 w-[60%] text-center flex flex-col items-center gap-y-4 max-md:text-lg">SUPLEMENTARNIA<GiPillDrop size={200}/></div>
    </div>

};
export default RegisterForm;