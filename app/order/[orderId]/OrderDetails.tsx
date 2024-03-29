import { Order } from "@prisma/client";

import Heading from "@/app/components/Heading";
import {formatPrice} from "@/utils/formatPrice";
import Status from "@/app/components/Status";
import {MdAccessTimeFilled, MdDeliveryDining, MdDone} from "react-icons/md";
import moment from "moment";
import OrderItem from "@/app/order/[orderId]/OrderItem";

interface OrderDetailsProps {
    order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({order}) => {

    return <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div className="mt-8">
            <Heading title="Szczegóły zamówienia"/>
        </div>
        <div>ID Zamówienia: {order.id}</div>
        <div>
            Całkowita kwota: {" "}
            <span className="font-bold">{formatPrice(order.amount)}</span>
        </div>
        <div className="flex gap-2 items-center">
            <div>Status płatności:</div>
            <div>
                {order.status === 'pending'
                    ? (
                        <Status text="Oczekiwanie" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>
                    )
                    :
                    order.status === 'complete'
                        ? (
                            <Status text="Zakończono" icon={MdDone} bg="bg-green-200" color="text-green-700"/>
                        ) : (
                            <></>
                        )}
            </div>
        </div>

        <div className="flex gap-2 items-center">
            <div>Status dostawy:</div>
            <div>
                {order.deliveryStatus === 'pending'
                    ? (
                        <Status text="Oczekiwanie" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>
                    )
                    :
                    order.deliveryStatus === 'dispatched'
                        ? (
                            <Status text="Wysłano" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700"/>
                        ) : order.deliveryStatus === 'delivered'
                            ? (
                                <Status text="Dostarczono" icon={MdDone} bg="bg-green-200" color="text-green-700"/>
                            ) :
                            (
                                <></>
                            )}
            </div>
        </div>
        <div>Data zamówienia: {moment(order.createDate).fromNow()}</div>
        <div>
            <h2 className="font-semibold mt-4 mb-2">Zamówione produkty</h2>
            <div className="grid grid-cols-5 text-xs gap-4 pb-2 pt-6 items-center font-bold">
                <div className="col-span-2 justify-self-start font-bold">PRODUKT</div>
                <div className="justify-self-center font-bold">CENA</div>
                <div className="justify-self-center font-bold">ILOŚĆ</div>
                <div className="justify-self-end font-bold">ŁĄCZNIE</div>
            </div>
            {order.products &&
                order.products.map((item) => {
                    return <>
                        <OrderItem key={item.id} item={item}></OrderItem>
                        <div className="border-b-2 border-green-200"/>
                    </>
                })}
        </div>

    </div>
}
export default OrderDetails;