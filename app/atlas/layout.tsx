import Container from "@/app/components/Container";
import AtlasNav from "@/app/components/atlas/AtlasNav";
import React from "react";

const Atlas = async ({children} : {children: React.ReactNode}) => {
    return <div>
        <Container>
            <AtlasNav/>
            {children}
        </Container>
    </div>
}
export default Atlas;