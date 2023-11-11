"use client"

import {useState} from "react";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import {FieldValues, useForm} from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import {categories} from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: '',
        }
    });

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    return (
        <>
            <Heading title="Dodaj produkt" center />
            <Input
                id="name"
                label="Nazwa"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="price"
                label="Cena"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input
                id="brand"
                label="Producent"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea
                id="description"
                label="Opis produktu"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckBox id="inStock" register={register}  label="Ten produkt jest na stanie"/>
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Zaznacz kategorie</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if (item.label == 'Wszystko') {
                            return null;
                        }
                        return (
                            <div key={item.label} className="col-span">
                                <CategoryInput onClick={(category) => setCustomValue('category', category)}
                                selected={category == item.label}
                                label = {item.label}
                                icon = {item.icon}
                               />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default AddProductForm;