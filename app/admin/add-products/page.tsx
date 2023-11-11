import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import AddProductForm from "@/app/admin/add-products/AddProductForm";
import {getCurrentUser} from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Dostęp zabroniony."/>
    }

    return <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div>
}
export default AddProducts;