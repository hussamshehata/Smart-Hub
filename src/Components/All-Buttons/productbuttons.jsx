import { Button } from "@/Components/ui/button.jsx"
import { addToCart } from "@/redux/Cartslice";
import { ShoppingCart, Heart,} from "lucide-react"
import { useDispatch } from "react-redux";

export default function ProductButtons({ product }) {

     const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-2 mt-2">
            <Button   variant="default" size="sm" onClick={() => { dispatch(addToCart(product));}}>
                <ShoppingCart size={22} className="me-2" />
                Add to cart
            </Button>


            <Button variant="outline" size="sm">
                <Heart size={22} className="me-2" />
                Wishlist
            </Button>
        </div>
    )
}