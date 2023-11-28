"use client"
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { BiSolidContact } from "react-icons/bi";

const ContactClient = () => {
    return (
        <div className="pt-12">
            <div className="flex justify-center gap-x-4 items-center">
                <p className="font-bold text-3xl">Kontakt</p>
                <BiSolidContact size={30}/>
            </div>
            <div className="pt-12 flex flex-col items-center">
                <div className="text-green-700 font-bold text-xl">Od poniedziałku do piątku w godzinach 7:00 - 15:00</div>
                <div className="flex gap-x-4 pt-8 text-center items-center">
                    <FaPhoneAlt size={24} />
                    <p>Kontakt telefoniczny:</p>
                    <p className="font-bold">111 222 333</p>
                </div>
                <div className="text-green-700 font-bold text-xl pt-16">Godziny telefoniczne nie odpowiadają? Napisz do nas maila!</div>
                <div className="flex gap-x-4 pt-8 text-center items-center">
                    <IoIosMail size={30} />
                    <p>Mail:</p>
                    <p className="font-bold">suplementarnia@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default ContactClient;