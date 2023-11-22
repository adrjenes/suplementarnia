import ProductCard from "@/app/components/products/ProductCard";
import getCategories, {IProductCategoriesParams} from "@/actions/getCategories";
import NullData from "@/app/components/NullData";
import List from "@/app/components/list/List";
import Container from "@/app/components/Container";


interface CategoriesProps {
    searchParams: IProductCategoriesParams
}

export default async function Categories({searchParams}: CategoriesProps) {
    const products = await getCategories(searchParams);

    if (products.length === 0) {
        return <NullData title="Nie znaleziono produktów. Wybierz kategorie."/>
    }

    function shuffleArray(array: any) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Poprawne przypisanie destrukturyzujące
        }
        return array;
    }
    const shuffledProducts = shuffleArray(products);

    return (
        <div>
            <List/>
            <div className="p-8">
                <Container>
                    <div className="pt-14">
                        <div className="bg-green-500 py-0.5"></div>
                        <div className="py-3 text-2xl flex justify-center bg-green-100 font-bold">Kreatyna</div>
                        <div className="bg-green-500 py-0.5"></div>
                    </div>
                    <div
                        className="pt-12 grid grid-cols-2 ssm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl: grid-cols-6 gap-8">
                        {shuffledProducts.map((product: any) => {
                            return <ProductCard key={product.id} data={product}/>
                        })}
                    </div>
                </Container>
            </div>
        </div>
    )
}