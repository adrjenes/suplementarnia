
import Container from "@/app/components/Container";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
import OrderDetails from "@/app/order/[orderId]/OrderDetails";

interface IPrams {
    orderId?: string;
}
const Order = async ({params}: {params: IPrams}) => {
    const order = await getOrderById(params);

    if (!order) return <NullData title="Brak zamówienia"/>
    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order}/>
            </Container>
        </div>
    );
};
export default Order;