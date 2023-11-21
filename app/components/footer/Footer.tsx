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
                        <h3 className="text-base font-bold mb-2">Sklep</h3>
                        <Link href="#">Suplements</Link>
                        <Link href="#">Suplements</Link>
                        <Link href="#">Suplements</Link>
                        <Link href="#">Suplements</Link>
                        <Link href="#">Suplements</Link>
                        <Link href="#">Suplements</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Pomoc</h3>
                        <Link href="#">Kontakt</Link>
                        <Link href="#">Polityka wysyłki</Link>
                        <Link href="#">Zwroty & wymiany</Link>
                        <Link href="#">Strona pomocy</Link>
                        <Link href="#">Kontakt</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">O nas</h3>
                        <p className="mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Facilis iure natus nihil officiis perspiciatis repudiandae!
                            Eligendi ipsum officiis possimus vero. Culpa distinctio et maxime voluptas.
                            Assumenda dolore esse obcaecati totam.
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