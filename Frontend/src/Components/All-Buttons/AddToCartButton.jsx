import React from "react";
import { Button } from "../ui/button"; 
import { useSelector } from "react-redux";
import { selectCartItems } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { addToCart , removeFromCart} from "@/redux/cartSlice";

function AddToCartButton({product}) {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isInCart = cartItems.find(item => item.id === product.id);

    const handleClick = () => {
        console.log(product);
        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    }

    return (
        <Button variant="default" size="default" onClick={handleClick} >
            {isInCart? "Added to Cart" : "Add to Cart"}
        </Button>
    );
}

export default AddToCartButton;