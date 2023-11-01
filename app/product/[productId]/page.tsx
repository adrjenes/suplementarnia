import ProductDetails from "@/app/product/[productId]/ProductDetails";
import Container from "@/app/components/Container";

import ListRating from "@/app/product/[productId]/ListRating";
import {products} from "@/utils/products";

interface IPrams {
    productId?: string;
}
const Product = ({params}: {params: IPrams}) => {

    const product = products.find((item) => item.id === params.productId);

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