import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import {products} from "@/utils/products";
import ProductCard from "@/app/components/products/ProductCard";
import getProducts, {IProductParams} from "@/actions/getProducts";
import NullData from "@/app/components/NullData";
import List from "@/app/components/list/List";

interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {
  const products = await getProducts(searchParams);

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
            <HomeBanner/>
            <div
                className="pt-20 grid grid-cols-2 ssm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl-grid-cols-5 2xl: grid-cols-6 gap-8">
              {shuffledProducts.map((product: any) => {
                return <ProductCard key={product.id} data={product}/>
              })}
            </div>
          </Container>
        </div>
      </div>
  )
}
