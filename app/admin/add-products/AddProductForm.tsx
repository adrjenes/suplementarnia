"use client"
import {useCallback, useEffect, useState} from "react";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import TextArea from "@/app/components/inputs/TextArea";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import {categories} from "@/utils/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import SelectImage from "@/app/components/inputs/SelectImage";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "@firebase/storage";
import firebaseApp from "@/libs/firebase";
import axios from "axios";
import {useRouter} from "next/navigation";

export type ImageType = { image: File | null; }
export type UploadedImageType = { image: string; }

const AddProductForm = () => {
    const router = useRouter();
    const [inputCount, setInputCount] = useState(0);
    const [imageCount, setImageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    const {register, handleSubmit, setValue, watch, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            details: [],
            price: '',
        }
    });
    useEffect(() => setCustomValue('images', images), [images]);
    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const validDetails = data.details.filter(detail => detail.flavour.trim() !== '' && detail.quantity != null && !isNaN(detail.quantity) && detail.quantity > 0);
        if (validDetails.length === 0) { setIsLoading(false); return toast.error("Proszę dodać przynajmniej jeden ważny wpis smaku i ilości.");}

        const isFlavourLengthValid = validDetails.every(detail => detail.flavour.length >= 3 && detail.flavour.length <= 25);
        const isQuantityValid = validDetails.every(detail => detail.quantity >= 1 && detail.quantity <= 10000);

        if (!isFlavourLengthValid) { setIsLoading(false); return toast.error("Nazwa każdego smaku musi mieć od 3 do 20 znaków.");}
        if (!isQuantityValid) { setIsLoading(false); return toast.error("Ilość każdego smaku musi być w zakresie od 1 do 10000.");}

        const formattedDetails = validDetails.map(detail => ({
            flavour: detail.flavour,
            quantity: +detail.quantity
        }));
        const formattedData = { ...data, details: formattedDetails};

        if (data.name.length < 3 || data.name.length > 30) { setIsLoading(false); return toast.error('Nazwa musi zawierać od 3 do 30 liter'); }
        if (data.name.length < 1 || data.brand.length > 20) { setIsLoading(false); return toast.error('Nazwa producenta musi zawierać od 3 do 30 liter');}
        if (data.price < 0 || data.price > 5000) { setIsLoading(false); return toast.error('Cena musi być większa niż 0 i mniejsza niż 5000'); }
        if (data.description.length > 500) { setIsLoading(false); return toast.error('Opis nie może przekraczać 500 znaków'); }
        if (!formattedData.category) { setIsLoading(false); return toast.error('Kategoria nie jest zaznaczona');}
        if (!formattedData.images || formattedData.images.length === 0) { setIsLoading(false); return toast.error("Brak zdjęcia!"); }

        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = [];

        const handleImageUploads = async () => {
            toast("Tworzenie produktu, zajmie to kilka sekund...");
            try {
                for (const item of formattedData.images) {
                    const fileName = new Date().getTime() + '-' + item.image.name;
                    const storage = getStorage(firebaseApp);
                    const storageRef = ref(storage, `products/${fileName}`);
                    const uploadTask = uploadBytesResumable(storageRef, item.image);
                    await new Promise<void>((resolve, reject) => {
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Przesyłanie jest w ' + progress + '% ukończone');
                                switch (snapshot.state) {
                                    case 'paused': break;
                                    case 'running': break;
                                }
                            },
                            (error) => reject(error),
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    uploadedImages.push({
                                        ...item,
                                        image: downloadURL,
                                    })
                                    resolve();
                                }).catch((error) => reject(error));
                            });
                    })
                }
            } catch (error) { setIsLoading(false); return toast.error("Błąd podczas obsługi przesyłania obrazów.");
            }
        };
        await handleImageUploads();
        const productData = {...formattedData, images: uploadedImages};
        axios.post('/api/product', productData).then(() => {
            toast.success('Produkt utworzony!');
            setIsProductCreated(true);
            router.refresh();
        })
            .catch((error) => { toast.error("Coś poszło nie tak z zapisem produktu do bazy danych.") })
            .finally(() => { setIsLoading(false); })
    }
    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) { return [value]; }
            return [...prev, value];
        })
    }, []);

    const removeImageFromState = useCallback((value: ImageType) => setImages(null), []);

    const handleChangeFlavour = (e) => {
        const count = parseInt(e.target.value, 10) || 0;
        if (count < 1 || count > 16) {
            toast.error('Liczba smaków musi być w zakresie od 1 do 16');
            setInputCount(0);
            return;
        }
        setInputCount(count);
    };

    const handleImageCountChange = (e) => {
        const count = parseInt(e.target.value, 10) || 0;
        if (count < 0 || count > 10) { toast.error('Ilość zdjęć musi być w zakresie od 0 do 10');
            return;
        }
        setImageCount(count);
    };

    return <>
            <Heading title="Dodaj produkt" center/>
            <Input id="name" label="'Nazwa' - 'Ilość'" disabled={isLoading} register={register} errors={errors}
                   required/>
            <Input id="price" label="Cena" disabled={isLoading} register={register} errors={errors} type="number"
                   required/>
            <Input id="brand" label="Producent" disabled={isLoading} register={register} errors={errors} required/>
            <TextArea id="description" label="Opis produktu" disabled={isLoading} register={register} errors={errors}
                      required/>
            <CustomCheckBox id="inStock" register={register} label="Ten produkt jest na stanie"/>
            <div className="w-full font-medium">
                <div className="mb-2 font-semibold">Zaznacz kategorie</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
                    {categories.map((item) => {
                        if (item.label == 'Wszystko') return null;
                        return <div key={item.label} className="col-span">
                            <CategoryInput onClick={(category) => setCustomValue('category', category)}
                                           selected={category == item.label} label={item.label} icon={item.icon}/>
                        </div>
                    })}
                </div>
                <div className="py-10 flex flex-col items-start">
                    <div className="w-full flex flex-col flex-wrap gap-4">
                        <div className="flex items-center">
                            <div className="mr-2">Wprowadź liczbę zdjęć do dodania:</div>
                            <input type="number" placeholder="0" onChange={handleImageCountChange} className="w-[70px] p-2 outline-none bg-white font-light border-2 rounded-md"/>
                        </div>
                        <div className="w-full flex flex-wrap gap-4">
                            {Array.from({length: imageCount}, (_, index) => (
                                <SelectImage key={index} isProductCreated={isProductCreated} addImageToState={addImageToState} removeImageFromState={removeImageFromState}/>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center pt-10">
                        <div className="mr-2">Wprowadź liczbę smaków i ich ilości do wyboru:</div>
                        <input type="number" placeholder="0" onChange={handleChangeFlavour} className="w-[70px] p-2 outline-none bg-white font-light border-2 rounded-md"/>
                    </div>
                    <div className="py-4 grid grid-cols-2 w-full gap-4">
                        {Array.from({length: inputCount}, (_, index) => (
                            <div key={index} className="flex gap-2">
                                <Input key={`flavour-${index}`} id={`details[${index}].flavour`} name={`details[${index}].flavour`} label={`Smak ${index + 1}`}
                                       disabled={isLoading} register={register} errors={errors} required placeholder={`Smak ${index + 1}`}/>

                                <Input key={`quantity-${index}`} id={`details[${index}].quantity`} name={`details[${index}].quantity`} label={`Ilość ${index + 1}`}
                                       disabled={isLoading} register={register} errors={errors} required type="number" placeholder={`Ilość`} className="text-center"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Button label={isLoading ? 'Ładowanie...' : 'Dodaj produkt'} onClick={handleSubmit(onSubmit)}/>
        </>
}
export default AddProductForm;