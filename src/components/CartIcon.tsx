"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Calculate total quantity of all items in cart
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link href="/cart" className="flex items-center gap-4"> 
        <div className="relative w-8 h-8 md:w-5 md:h-5">
            <Image src="/cart.png.png" alt="" fill/>
        </div>

        <span>Cart [{isHydrated ? totalQuantity : 0}]</span>
    </Link>
  );
}