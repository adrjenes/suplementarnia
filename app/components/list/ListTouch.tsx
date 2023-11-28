"use client"

import Container from "@/app/components/Container";
import React, {useState} from "react";
import ListContent from "@/app/components/list/ListContent";
import Categories from "@/app/components/nav/Categories";


const ListTouch = () => {

    return <div className="absolute w-full overflow-hidden left-0 top-16 pt-1.5">
            <Container>
                <Categories/>
            </Container>
    </div>


}
export default ListTouch;