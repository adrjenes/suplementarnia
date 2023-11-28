"use client"

import Container from "@/app/components/Container";
import Link from "next/link";
import AdminNavItem from "@/app/components/admin/AdminNavItem";
import {usePathname} from "next/navigation";
import { RiFolderAddLine } from "react-icons/ri";
import { FaParachuteBox } from "react-icons/fa6";
import { MdManageSearch } from "react-icons/md";
const AdminNav = () => {
    const pathname = usePathname();
    return (
        <div className="w-full top-20 pt-4">
            <Container>
                <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                    <Link href="/admin/add-products">
                        <AdminNavItem label="Dodaj produkt" icon={RiFolderAddLine} selected={pathname === '/admin/add-products'}/>
                    </Link>

                    <Link href="/admin/manage-products">
                        <AdminNavItem label="Zarządzaj produktami" icon={MdManageSearch} selected={pathname === '/admin/manage-products'}/>
                    </Link>

                    <Link href="/admin/manage-orders">
                        <AdminNavItem label="Zarządzaj zamówieniami" icon={FaParachuteBox} selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    )
}
export default AdminNav;