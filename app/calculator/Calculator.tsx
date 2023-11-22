"use client"
import React, { useState } from 'react';

const Calculator = () => {
    const [weight, setWeight] = useState<number>(null);
    const [height, setHeight] = useState<number>(null);
    const [bmi, setBmi] = useState<number | null>(null);

    const calculateBMI = () => {
        if (weight > 0 && height > 0) {
            const result: number = weight / (height * height);
            setBmi(result * 10000); // Większa precyzja zaokrąglenia
        } else {
            setBmi(0); // Komunikat o błędnym wprowadzeniu danych
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        calculateBMI();
    };

    return (
        <div className="p-8 md:p-12 lg:p-16 bg-white rounded-xl shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Kalkulator BMI</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        placeholder="Podaj wagę (kg)"
                        className="w-full p-4 border rounded-md text-lg"
                    />
                </div>
                <div>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        placeholder="Podaj wzrost (cm)"
                        className="w-full p-4 border rounded-md text-lg"
                    />
                </div>
                <button type="submit" className="w-full p-4 bg-green-600 text-white rounded-md text-lg hover:bg-green-700 transition-colors">Oblicz</button>
            </form>
            {bmi !== null && (
                <div className="p-16 text-center flex flex-col">
                    <p className="text-2xl">Twoje BMI wynosi:</p> <span className="font-semibold text-2xl pt-4">{bmi}</span>
                </div>
            )}
        </div>
    );
};

export default Calculator;