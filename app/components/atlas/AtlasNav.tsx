"use client"
import Container from "@/app/components/Container";
import Link from "next/link";
import AdminNavItem from "@/app/components/admin/AdminNavItem";
import {usePathname} from "next/navigation";
import { GiCrossedBones } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6"
import { GiMuscleUp } from "react-icons/gi";
import { BsPersonArmsUp } from "react-icons/bs";
import { GiElbowPad } from "react-icons/gi";
import { GiFat } from "react-icons/gi";
import { GiHieroglyphLegs } from "react-icons/gi";
const AtlasNav = () => {
    const pathname = usePathname();
    return (
        <div className="w-full top-20 pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href="/atlas/shoulders">
                        <AdminNavItem label="Barki" icon={GiCrossedBones} selected={pathname === '/admin/add-products'}/>
                    </Link>

                    <Link href="/atlas/chest">
                        <AdminNavItem label="Klatka piersiowa" icon={GiMuscleUp} selected={pathname === '/admin/manage-products'}/>
                    </Link>

                    <Link href="/atlas/back">
                        <AdminNavItem label="Plecy" icon={FaPersonWalkingArrowLoopLeft} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                    <Link href="/atlas/arms">
                        <AdminNavItem label="Ramiona" icon={BsPersonArmsUp} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                    <Link href="/atlas/forearms">
                        <AdminNavItem label="Przedramie" icon={GiElbowPad} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                    <Link href="/atlas/belly">
                        <AdminNavItem label="Brzuch" icon={GiFat} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                    <Link href="/atlas/legs-buttocks">
                        <AdminNavItem label="Nogi i pośladki" icon={GiHieroglyphLegs} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    )
}
export default AtlasNav;