import { Link } from "react-router-dom";
import {ScrollArea, ScrollBar} from "../ui/scroll-area.jsx";
import BrandsData from "../../data/BrandsData.json"
function Brands() {

    return (
        <div className="mx-40  py-10">
            <ScrollArea className="w-full whitespace-nowrap">
                <ul className="list-none  flex  justify-between  text-xl  gap-4 min-w-max">
                    {BrandsData.map((brand) => (
                        <li key={brand.name} className="flex  items-center text-neutral-700  text-xl">
                            <Link to={`/${brand.name.toLowerCase()}`} className="flex  items-center  gap-2  hover:underline  hover:text-primary-600  ">
                                <img src={brand.image} alt={brand.name} className="w-20  h-auto rounded-full" />
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