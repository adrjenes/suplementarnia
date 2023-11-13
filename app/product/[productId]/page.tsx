import ProductDetails from "@/app/product/[productId]/ProductDetails";
import Container from "@/app/components/Container";

import ListRating from "@/app/product/[productId]/ListRating";
import {products} from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";

interface IPrams {
    productId?: string;
}
const Product = async ({params}: {params: IPrams}) => {

    const product = await getProductById(params);

    if (!product) return <NullData title="Produkt z podanym ID nie istnieje"/>

    return (
    <div className="p-8">
        <Container>
            <ProductDetails product={product}/>
            <div className="flex flex-col mt-20 gap-4">
                <div>Dodaj ocenę</div>
                <ListRating product={product}/>
            </div>
        </Container>
    </div>
    );
};
export default Product;