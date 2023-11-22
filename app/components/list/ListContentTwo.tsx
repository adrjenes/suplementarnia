import Link from "next/link";

const ListContentTwo = () => {
    return (
            <div className="grid grid-cols-6 gap-4 justify-between w-full pt-12 h-[130px] text-black">
                <div>
                    <Link href="/creatine"> DzikWK </Link>
                </div>
                <div>
                    Genlab
                </div>
                <div>
                    Olimp
                </div>
                <div>
                    OstroVit
                </div>
                <div>
                    HerraVita
                </div>
                <div>
                    StrongProtect
                </div>
            </div>


    )
}
export default ListContentTwo;

