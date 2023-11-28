"use client"
import {Order, User} from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {formatPrice} from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import {MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye} from "react-icons/md";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import {useRouter} from "next/navigation";
import {getStorage} from "@firebase/storage";
import firebaseApp from "@/libs/firebase";
import moment from "moment";

interface OrdersClientProps { orders: ExtendedOrder[] }
type ExtendedOrder = Order & { user: User }

const OrderClient: React.FC<OrdersClientProps> = ({orders}) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = [];
    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        });
    }
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'customer', headerName: 'Nazwa klienta', width: 150},
        {field: 'amount', headerName: 'Kwota', width: 130,
            renderCell: (params) => { return <div className="font-bold text-slate-800">{params.row.amount}</div> }
        },
        {field: 'paymentStatus', headerName: 'Status płatności', width: 130,
            renderCell: (params) => {
                return <div>
                    {params.row.paymentStatus === 'pending'
                        ? (
                            <Status text="Przetwarzanie" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>
                        ) : params.row.paymentStatus === 'complete' ? (
                            <Status text="Zakończono" icon={MdDone} bg="bg-green-200" color="text-green-700"/>
                        )  : (
                            <></>
                        )}
                </div>
            }},
        {
            field: "deliveryStatus",
            headerName: "Status wysyłki",
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.deliveryStatus === 'pending' ? (
                            <Status text="Przetwarzanie" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700"/>
                        ) : params.row.deliveryStatus === 'dispatched' ? (
                            <Status text="Wysłano" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700"/>
                        ) : params.row.deliveryStatus === 'delivered' ? (
                            <Status text="Dostarczono" icon={MdDone} bg="bg-green-200" color="text-green-700"/>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                );
            },
        },
        {
            field: 'date',
            headerName: 'Data',
            width: 130
        },
        {field: 'action', headerName: 'Akcja', width: 200,
            renderCell: (params) => {
                return <div className="flex justify-between gap-4 w-full">
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/order/${params.row.id}`);
                    }}/>
                </div>
            }},
    ];

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Zarządzaj zamówieniami" center/>
            </div>
            <div style={{height: 600, width: "100%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 9},
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>

        </div>)
}
export default OrderClient;


