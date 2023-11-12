import Container from "@/app/components/Container";
import ManageProductsClient from "@/app/admin/manage-products/ManageProductsClient";
import {getCurrentUser} from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";

const ManageProducts = async () => {
    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser();
    return <div className="pt-8">
        <Container>
            <ManageProductsClient products={products}/>
        </Container>
    </div>
}
export default ManageProducts;