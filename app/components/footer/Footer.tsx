import Container from "@/app/components/Container";
import FooterList from "@/app/components/footer/FooterList";
import Link from "next/link";
import {MdFacebook} from "react-icons/md";
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from "react-icons/ai";
import {FaTiktok} from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="bg-green-300  text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">TWOJE KONTO</h3>
                        <Link href="/cart">Koszyk</Link>
                        <Link href="/orders">Zamówienia</Link>
                        <Link href="/logout">Wyloguj</Link>
                        <Link href="/login">Zaloguj</Link>
                        <Link href="/register">Zarejestruj</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Pomoc</h3>
                        <Link href="#">Kontakt</Link>
                        <Link href="#">O nas</Link>
                        <Link href="#">Zwroty & wymiany</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">O nas</h3>
                        <p className="mb-2">
                            Suplementarnia to Twój zaufany sklep z suplementami.
                            Oferujemy starannie wyselekcjonowane produkty, które wspierają zdrowie i dobre samopoczucie.
                            Nasza misja to dostarczanie wysokiej jakości, bezpiecznych i skutecznych suplementów dla każdego.<br/>
                            Więcej informacji znajdziesz <Link href="/about"><b>TUTAJ</b></Link>
                        </p>
                        <p>&copy; {new Date().getFullYear()} Suplementarnia. All rights reserved.</p>
                    </div>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Obserwuj nas</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="flex items-center">
                                <MdFacebook size={32} />
                                <span className="ml-2">Facebook</span>
                            </Link>
                            <Link href="#" className="flex items-center">
                                <AiFillInstagram size={32} />
                                <span className="ml-2">Instagram</span>
                            </Link>
                            <Link href="#" className="flex items-center">
                                <FaTiktok size={32} />
                                <span className="ml-2">TikTok</span>
                            </Link>
                            <Link href="#" className="flex items-center">
                                <AiFillYoutube size={32} />
                                <span className="ml-2">YouTube</span>
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    )
}
export default Footer;