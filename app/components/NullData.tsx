interface NullDataProps {
    title: string;
}
const NullData: React.FC<NullDataProps> = ({ title }) => {
    return (
        <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl text-green-700">
            <p className="font-bold">{title}</p>
        </div>
    )
}
export default NullData;