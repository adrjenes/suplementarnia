import Container from "@/app/components/Container";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
    return (
        <div className="sticky top-0 w-full bg-green-200 z-30 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href="/"><Image src="/logo.png" alt="logo_suplementarnia" width={180} height={60} priority/></Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <div>CartCount</div>
                            <div>UserMenu</div>
                        </div>
                    </div>
                </Container>
            </div>
    </div>
    )
}
export default Navbar;