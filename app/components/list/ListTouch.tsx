"use client"

import Container from "@/app/components/Container";
import {useState} from "react";
import ListContent from "@/app/components/list/ListContent";


const ListTouch = () => {
    const [overDiv, setOverDiv] = useState(true);
    return <div>
        {overDiv && <div className="
    absolute
    w-full
    overflow-hidden
    left-0
    top-16
    pt-1.5
    "
        >
            <Container>
                <div className="flex bg-green-50 border-x-[1px] border-b-[1px] border-green-400" onMouseLeave={() => setOverDiv(false)}>
                    <ListContent/>
                </div>
            </Container>
    </div>
        }
    </div>
}
export default ListTouch;