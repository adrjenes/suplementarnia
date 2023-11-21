import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Funkcja easing, która definiuje jak płynne będzie przewijanie
const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};

const ProductImage = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.images[0].image);
    const scrollContainer = useRef(null);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);

    // Sprawdzanie pozycji przewijania i ustawienie stanu przycisków
    const checkScrollPosition = () => {
        if (scrollContainer.current) {
            setIsAtTop(scrollContainer.current.scrollTop === 0);
            setIsAtBottom(scrollContainer.current.scrollTop + scrollContainer.current.offsetHeight >= scrollContainer.current.scrollHeight);
        }
    };

    useEffect(() => {
        checkScrollPosition(); // Sprawdź pozycję początkową po montażu
        // eslint-disable-next-line
    }, []);

    const smoothScroll = (endPosition) => {
        const startTime = Date.now();
        const startPosition = scrollContainer.current.scrollTop;
        const distance = endPosition - startPosition;
        const duration = 500;

        const scroll = () => {
            const currentTime = Date.now() - startTime;
            const timeFraction = currentTime / duration;
            if (timeFraction < 1) {
                const nextScrollPosition = easeInOutQuad(timeFraction, startPosition, distance, 1);
                scrollContainer.current.scrollTop = nextScrollPosition;
                requestAnimationFrame(scroll);
            } else {
                scrollContainer.current.scrollTop = endPosition;
                checkScrollPosition(); // Aktualizacja stanu przycisków po zakończeniu animacji
            }
        };

        requestAnimationFrame(scroll);
    };

    const scroll = (direction) => {
        const container = scrollContainer.current;
        if (container) {
            const scrollAmount = 100; // Można dostosować do rozmiaru miniatur
            const newScrollPosition = direction === 'up' ? container.scrollTop - scrollAmount : container.scrollTop + scrollAmount;
            smoothScroll(newScrollPosition);
        }
    };

    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="col-span-1 flex flex-col items-center">
                <button onClick={() => scroll('up')} disabled={isAtTop}>
                    <FaChevronUp className={`cursor-pointer hover:text-green-500 ${isAtTop ? 'text-gray-300 hover:text-gray-300' : ''}`} />
                </button>
                <div className="overflow-hidden max-h-[500px]" ref={scrollContainer} onScroll={checkScrollPosition}>
                    <div className="flex flex-col h-full">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setSelectedImage(image.image)}
                                 className={`cursor-pointer p-1 mb-2 ${selectedImage === image.image ? 'border-[2px]' : ''}`}>
                                <Image src={image.image} alt={`Product image ${index + 1}`} width={100} height={100} className="object-contain"/>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => scroll('down')} disabled={isAtBottom}>
                    <FaChevronDown className={`cursor-pointer hover:text-green-500 ${isAtBottom ? 'text-gray-300 hover:text-gray-300' : ''}`} />
                </button>
            </div>
            <div className="col-span-5 relative aspect-square">
                <Image src={selectedImage} alt="Selected product image" layout="fill" className="object-contain"/>
            </div>
        </div>
    );
};

export default ProductImage;