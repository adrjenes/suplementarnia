"use client"
import {Order, User} from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {formatPrice} from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import {MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye} from "react-icons/md";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import {useCallback} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {getStorage} from "@firebase/storage";
import firebaseApp from "@/libs/firebase";
import moment from "moment";

interface ManageOrdersClientProps { orders: ExtendedOrder[] }
type ExtendedOrder = Order & { user: User }

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({orders}) => {
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
        { field: 'id', headerName: 'ID', width: 220, align: 'center', headerAlign: 'center' },
        { field: 'customer', headerName: 'Nazwa klienta', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'amount', headerName: 'Kwota', width: 130, align: 'center', headerAlign: 'center',
            renderCell: (params) => { return <div className="font-bold text-red-500 text-center">{params.row.amount}</div> }
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
                    <ActionBtn icon={MdDeliveryDining} onClick={() => {
                        handleDispatch(params.row.id);
                    }}
                    />
                    <ActionBtn icon={MdDone} onClick={() => {
                        handleDeliver(params.row.id);
                    }}/>
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/order/${params.row.id}`);
                    }}/>
                </div>
            }},
    ];

    const handleDispatch = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: 'dispatched'
        })
            .then((res) => {
                toast.success('Zamówienie wysłano.')
                router.refresh();
            })
            .catch((err) => {
                toast.error("Coś poszło nie tak.");
                console.log(err);
            })
    }, []);

    const handleDeliver = useCallback((id: string) => {
        axios.put('/api/order', {
            id,
            deliveryStatus: 'delivered'
        })
            .then((res) => {
                toast.success('Zamówienie dostarczone.')
                router.refresh();
            })
            .catch((err) => {
                toast.error("Coś poszło nie tak.");
                console.log(err);
            })
    }, []);

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mt-8 text-green-700 pb-12">
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
export default ManageOrdersClient;


