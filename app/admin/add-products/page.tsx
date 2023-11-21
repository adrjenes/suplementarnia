import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import AddProductForm from "@/app/admin/add-products/AddProductForm";


const AddProducts = async () => {

    return <div className="p-8">
        <Container>
            <FormWrap>
                <AddProductForm/>
            </FormWrap>
        </Container>
    </div>
}
export default AddProducts;