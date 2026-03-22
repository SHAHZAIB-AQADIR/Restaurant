"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, changeQuantity } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const serviceCost = 0; // You can make this dynamic
  const deliveryCost = subtotal > 50 ? 0 : 5; // Free delivery over $50
  const total = subtotal + serviceCost + deliveryCost;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    changeQuantity(id, delta);
  };

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
        <div className="h-1/2 p-4 flex flex-col justify-center items-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
          <h1 className="text-2xl font-bold mb-4">Loading cart...</h1>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
        <div className="h-1/2 p-4 flex flex-col justify-center items-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p>Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <Image src={item.img} alt="" width={100} height={100} />
            <div className="">
              <h1 className="uppercase text-xl font-bold">{item.title}</h1>
              <span>{item.options?.[0]?.title || "Regular"}</span>
              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <h2 className="font-bold">${(item.price * item.quantity).toFixed(2)}</h2>
              <span className="text-sm">${item.price.toFixed(2)} each</span>
            </div>
            <button 
              onClick={() => handleRemoveItem(item.id)}
              className="cursor-pointer text-red-500 hover:text-red-700"
            >
              
            </button>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({totalItems} items)</span>
          <span className="">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">${serviceCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className={deliveryCost === 0 ? "text-green-500" : ""}>
            {deliveryCost === 0 ? "FREE!" : `$${deliveryCost.toFixed(2)}`}
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
       <Link href={"/Checkout"}><button className="bg-red-500 text-white p-3 rounded-md w-1/2 self-end hover:bg-red-600 transition-colors">
          CHECKOUT
        </button></Link> 
      </div>
    </div>
  );
};

export default CartPage;