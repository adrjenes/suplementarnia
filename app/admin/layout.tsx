import React from "react";
import AdminNav from "@/app/components/admin/AdminNav";
import {getCurrentUser} from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

export const metadata = {
    title: "ADMIN Suplementarnia",
    description: "ADMIN PANEL Suplementarnia",
};
const AdminLayout = async ({children} : { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <div>
            <NullData title="Dostęp zabroniony."/>
        </div>
    } else {
        return (
            <div>
                <AdminNav/>
                {children}
            </div>
        )
    }

}
export default AdminLayout;