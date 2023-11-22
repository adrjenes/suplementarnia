import Link from "next/link";

const ListContent = () => {

    return (
            <div className="grid grid-cols-6 gap-4 justify-between w-full pt-12 h-[130px] text-black">
                <div>
                    <Link href="/categories/creatine"> Kreatyna </Link>
                </div>
                <div>
                    Witamina
                </div>
                <div>
                    Białko
                </div>
                <div>
                    Przedtreningówka
                </div>
                <div>
                    Spalacz tłuszczu
                </div>
                <div>
                    Adaptogeny
                </div>
            </div>


    )
}
export default ListContent;

