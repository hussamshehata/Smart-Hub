import { Link } from "react-router-dom";
function Brands() {
    const brands = [
        { name: "Apple" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"},
        { name: "Samsung" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"},
        { name: "Oppo" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"},
        { name: "Huawei" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"},
        { name: "Sony" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"},
        { name: "Poco" , image: "https://res.cloudinary.com/dbaqz7nim/image/upload/v1760885950/image_s1abl3.jpg"}
    ];

    return (
        <div className="mx-40  py-10">
            <ul className="list-none  flex  justify-between  text-xl">
                {brands.map((brand) => (
                    <li key={brand.name} className="flex  flex-row  text-neutral-700  text-xl">
                        <Link to={`/${brand.name.toLowerCase()}`} className="flex  items-center  gap-2  hover:underline  hover:text-primary-600  ">
                            <img src={brand.image} alt={brand.name} className="w-8  h-auto" />
                            {brand.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Brands;