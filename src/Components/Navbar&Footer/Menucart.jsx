import React from "react";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@/Components/ui/button.jsx";
import CartSidebar from "./Sidebar.jsx";
import { selectCartTotalQuantity } from "@/redux/cartSlice";

export default function Menucart() {
  // Get cart count from Redux store
  const cartCount = useSelector(selectCartTotalQuantity);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <>
      {/* Announcement Bar */}

      {/* Navbar */}
      <div className="relative hidden sm:flex">
        <Button
          variant="outline"
          size="icon"
          className="me-2"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingBag size={18} />
        </Button>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}