"use client"
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import {RxDotFilled} from 'react-icons/rx'

import {useEffect, useState} from "react";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";

const slides = [
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-suplementarnia.appspot.com/o/products%2F1700886021322-baner1.png?alt=media&token=99fbfc09-00d1-4258-a2ce-2004e31ccf45',
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-suplementarnia.appspot.com/o/products%2F1700886043502-baner2.png?alt=media&token=eeeee53c-c881-4a6c-94ef-736750b50dd4',
    },
    {
        url: 'https://firebasestorage.googleapis.com/v0/b/fir-suplementarnia.appspot.com/o/products%2F1700886083827-baner3.png?alt=media&token=b58c6ae3-44b5-437f-9950-4786818c5508',
    }
];

const HomeBanner = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0 | null);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedSlideIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedSlideIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
        setSelectedSlideIndex(slideIndex);
    };

    const changeSlideAutomatically = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedSlideIndex(newIndex);
    };

    const intervalTime = 3500;

    useEffect(() => {
        const intervalId = setInterval(changeSlideAutomatically, intervalTime);
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className="max-w-[1700px] ssm:h-[100px] sm:h-[200px] md:h-[300px] lg:h-[500px] w-full m-auto relative group">
            <div
                style={{
                    backgroundImage: `url(${slides[currentIndex].url}`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
                className="w-full h-full bg-center bg-cover duration-500"
            ></div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-1 text-2xl rounded-full text-white cursor-pointer hover:text-green-500">
                    <RiArrowLeftSLine onClick={prevSlide} size={40}/>
                </div>
                <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-1 text-2xl rounded-full text-white cursor-pointer hover:text-green-500">
                    <RiArrowRightSLine onClick={nextSlide} size={40}/>
                </div>
                <div className="flex top-4 justify-center py-2">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={`text-2xl cursor-pointer ${selectedSlideIndex === slideIndex ? 'text-green-500' : ''}`}>
                            <RxDotFilled/>
                        </div>
                    ))}
                </div>
            </div>


    )
}
export default HomeBanner;