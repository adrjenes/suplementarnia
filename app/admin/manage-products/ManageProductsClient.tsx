"use client"
import {Product} from "@prisma/client";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {formatPrice} from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import {MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye} from "react-icons/md";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import {useCallback} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {deleteObject, getStorage, ref} from "@firebase/storage";
import firebaseApp from "@/libs/firebase";
interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products}) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = [];
    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
                details: product.details,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220, align: 'center', headerAlign: 'center'},
        {field: 'name', headerName: 'Nazwa', width: 220, align: 'center', headerAlign: 'center'},
        {field: 'price', headerName: 'Cena', width: 100, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return <div className="font-bold text-red-500">{params.row.price}</div>
            }
        },
        {field: 'category', headerName: 'Kategoria', width: 100, align: 'center', headerAlign: 'center'},
        {field: 'brand', headerName: 'Producent', width: 100, align: 'center', headerAlign: 'center'},
        {field: 'inStock', headerName: 'Na stanie', width: 120, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return <div>
                    {params.row.inStock === true ? <Status text="Na stanie" icon={MdDone} bg="bg-teal-200" color="text-teal-700"/> : <Status text="Brak" icon={MdClose} bg="bg-red-200" color="text-red-700"/>}
                </div>
            }},
        {field: 'action', headerName: 'Akcja', width: 200, align: 'center', headerAlign: 'center',
            renderCell: (params) => {
                return <div className="flex justify-between gap-4 w-full">
                    <ActionBtn icon={MdCached} onClick={() => {
                        handleToggleStock(params.row.id, params.row.inStock);
                    }}
                    />
                    <ActionBtn icon={MdDelete} onClick={() => {
                        handleDelete(params.row.id, params.row.images);
                    }}/>
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/product/${params.row.id}`);
                    }}/>
                </div>
            }},
    ];

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product', {
            id,
            inStock: !inStock
        })
            .then((res) => {
                toast.success('Status produktu został zmieniony.')
                router.refresh();
        })
            .catch((err) => {
                toast.error("Coś poszło nie tak.");
                console.log(err);
        })
    }, []);
    const handleDelete = useCallback(async(id: string, images: any[]) => {
        const handleImageDelete = async() => {
            try {
                for(const item of images) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image);
                        await deleteObject(imageRef);
                        console.log("Obraz usunięty", item.image);
                    }
                }
            } catch (error) { return console.log("Błąd podczas usuwania zdjęcia", error)}
        }
        await handleImageDelete()
        axios.delete(`/api/product/${id}`).then(
            (res) => {
                toast.success("Zmieniono status produktu.");
                router.refresh();
            })
            .catch((err) => {
                toast.error("Nie udało się usunąć produktu");
                console.log(err);
            })
    }, [])


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Zarządzaj produktami" center/>
            </div>
            <div style={{height: 600, width: "100%"}}>
                <DataGrid rows={rows} columns={columns}
                    initialState={{
                        pagination: { paginationModel: {page: 0, pageSize: 9}},
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>

    </div>)
}
export default ManageProductsClient;


