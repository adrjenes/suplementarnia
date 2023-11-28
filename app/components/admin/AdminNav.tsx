"use client"

import Container from "@/app/components/Container";
import Link from "next/link";
import AdminNavItem from "@/app/components/admin/AdminNavItem";
import {MdDashboard, MdFormatListBulleted, MdLibraryAdd} from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import {usePathname} from "next/navigation";

const AdminNav = () => {
    const pathname = usePathname();
    return (
        <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href="/admin/add-billboard">
                        <AdminNavItem label="Dodaj billboard" icon={MdAddToQueue} selected={pathname === '/billboard'}/>
                    </Link>
                    <Link href="/admin/add-products">
                        <AdminNavItem label="Dodaj produkt" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'}/>
                    </Link>

                    <Link href="/admin/manage-products">
                        <AdminNavItem label="Zarządzaj produktami" icon={MdDashboard} selected={pathname === '/admin/manage-products'}/>
                    </Link>

                    <Link href="/admin/manage-orders">
                        <AdminNavItem label="Zarządzaj zamówieniami" icon={MdFormatListBulleted} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    )
}
export default AdminNav;