import { Link } from "react-router-dom";
import {ScrollArea, ScrollBar} from "../ui/scroll-area.jsx";
import BrandsData from "../../data/BrandsData.json"
function Brands() {

    return (
        <div className="flex flex-row items-center gap-4 mx-40  py-10">
            <h2 className="text-neutral-700 text-4xl">Brands:</h2>
            <ScrollArea className="w-full p-2">

                <ul className="list-none  flex   text-xl  gap-4  min-w-max">
                    {BrandsData.map((brand) => (
                        <li key={brand.name} className="group  flex  items-center text-neutral-700  text-xl">
                            <Link to={`/${brand.name.toLowerCase()}`} className="flex  items-center  gap-1  group  hover:text-primary-600  ">
                                <img src={brand.image} alt={brand.name} className="w-12  rounded-full  p-1 border-0 group-hover:border group-hover:border-primary-600 transition-all" />
                                {brand.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ScrollBar orientation="horizontal" />

            </ScrollArea>
        </div>
    );
}

export default Brands;