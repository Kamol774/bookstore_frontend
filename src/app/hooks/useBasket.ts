import { useState } from "react";
import { CartItem } from "../../lib/types/search";


const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);//currentCart ni boshlang'ich qiymat deb belgilayapmiz

  /* HANDLERS */  //(defination->parametr)
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find((item: CartItem) => item._id === input._id);
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) => item._id === input._id ? { ...exist, quantity: exist.quantity + 1 } : item);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi

    } else {
      const cartUpdate = [...cartItems, { ...input }];//kirayotgan cartItemdan tashkil topgan yangi array
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi
    }
  };

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find((item: CartItem) => item._id === input._id);
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi
    } else {
      const cartUpdate = cartItems.map((item: CartItem) => item._id === input._id ? { ...exist, quantity: exist.quantity - 1 } : item);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi
    }
  };
  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter((item: CartItem) => item._id !== input._id)
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi
  };

  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cardData");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll
  };
};
export default useBasket;