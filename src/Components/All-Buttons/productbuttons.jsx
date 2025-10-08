import { Button } from "@/Components/All-Buttons/ui/button.jsx"
import { ShoppingCart, Heart } from "lucide-react"

export default function ProductButtons() {
    return (
        <div className="flex items-center gap-2 mt-2">
            <Button variant="default" size="sm">
                <ShoppingCart size={22} className="me-2" />
                Checkout
            </Button>

            <Button variant="outline" size="sm">
                <Heart size={22} className="me-2" />
                Wishlist
            </Button>
        </div>
    )
}
