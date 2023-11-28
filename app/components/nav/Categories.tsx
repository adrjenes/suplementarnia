"use client"
import Container from "@/app/components/Container";
import {categories} from "@/utils/Categories";

import Category from "@/app/components/nav/Category";
import {usePathname, useSearchParams} from "next/navigation";

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return <div className="bg-green-100 border-[1px] border-green-700">
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto h-[150px]">
                {categories.map((item) => (
                    <Category
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={category === item.label || (category === null && item.label === 'All')}
                    />
                ))}
            </div>
        </Container>

        </div>
}
export default Categories;