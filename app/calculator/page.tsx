import Container from "@/app/components/Container";
import CartClient from "@/app/cart/CartClient";
import {getCurrentUser} from "@/actions/getCurrentUser";
import Calculator from "@/app/calculator/Calculator";

const Cart = async () => {

    return (
        <div className="pt-2">
            <Container>
                <Calculator/>
            </Container>
        </div>
    )
}
export default Cart;