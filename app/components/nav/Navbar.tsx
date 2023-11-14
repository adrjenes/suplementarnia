import Container from "@/app/components/Container";

import Link from "next/link";
import Image from "next/image";
import CartCount from "@/app/components/nav/CartCount";
import UserMenu from "@/app/components/nav/UserMenu";
import {getCurrentUser} from "@/actions/getCurrentUser";
import SearchBar from "@/app/components/nav/SearchBar";


const Navbar = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className="top-0 w-full bg-white z-30 shadow-sm">
            <div className="py-2 border-b-[1px] border-green-400">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0 h-[72px]">
                        <Link href="/"><Image src="/images/logo.png" alt="logo_suplementarnia" width={210} height={60} priority/></Link>
                        <div className="hidden md:block">
                            <SearchBar placeholder="Wyszukaj produkt"/>
                        </div>
                        <div className="flex items-center gap-2 md:gap-6">
                            <UserMenu currentUser={currentUser}/>
                            <CartCount/>
                        </div>
                    </div>
                </Container>
            </div>
    </div>
    )
}
export default Navbar;