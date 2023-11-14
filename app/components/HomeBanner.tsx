"use client"
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import {RxDotFilled} from 'react-icons/rx'

import {useEffect, useState} from "react";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";

const slides = [
    {
        url: '/images/banner/baner1.png',
    },
    {
        url: '/images/banner/baner2.png',
    },
    {
        url: '/images/banner/baner3.png',
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
        <div className="max-w-[1500px] ssm:h-[100px] sm:h-[200px] md:h-[300px] lg:h-[350px] w-full m-auto relative group">
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