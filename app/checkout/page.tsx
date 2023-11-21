import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWraps";
import CheckoutClient from "@/app/checkout/CheckoutClient";

const Checkout = () => {
    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckoutClient/>
                </FormWrap>
            </Container>
        </div>
    )
}
export default Checkout;