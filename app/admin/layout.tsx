import React from "react";
import AdminNav from "@/app/components/admin/AdminNav";

export const metadata = {
    title: "ADMIN Suplementarnia",
    description: "ADMIN PANEL Suplementarnia",
};
const AdminLayout = ({children} : { children: React.ReactNode }) => {
    return (
        <div>
            <AdminNav/>
            {children}
        </div>
    )
}
export default AdminLayout;