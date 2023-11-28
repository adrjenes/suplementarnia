import ProductDetails from "@/app/product/[productId]/ProductDetails";
import Container from "@/app/components/Container";

import ListRating from "@/app/product/[productId]/ListRating";
import {products} from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "@/app/product/[productId]/AddRating";
import {getCurrentUser} from "@/actions/getCurrentUser";

interface IPrams {
    productId?: string;
}
const Product = async ({params}: {params: IPrams}) => {
    const product = await getProductById(params);
    const user = await getCurrentUser();
    if (!product) return <NullData title="Produkt z podanym ID nie istnieje"/>

    return (
    <div className="p-8">
        <Container>
            <ProductDetails product={product}/>
            <div className="flex flex-col mt-20 gap-4 max-w-[500px]">
                <AddRating product={product} user={user}/>
                <ListRating product={product}/>
            </div>
        </Container>
    </div>
    );
};
export default Product;