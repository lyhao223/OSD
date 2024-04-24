
interface ListTechnologyProps {
    id: string;
    img: string;
    title: string;
    description: string;
}

const ListTechnology = ({ id, img, title, description }: ListTechnologyProps) => {
    return (
        <>
        <div key={id} className="flex flex-col items-center space-y-3 mb-20 md:flex-row md:mx-14 md:space-x-8 ">
            <img src={img} alt="Python" className="w-24 h-24" />
            <div className="space-y-3 md:space-y-5 ">
                <h1 className="text-4xl font-merriweather leading-8 font-normal text-white ">{title}</h1>
                <p className="text-xl font-merriweather leading-8 font-normal text-white">{description}</p>
            </div>
        </div>

        
        </>
       
        
    );
}

export default ListTechnology
