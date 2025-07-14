"use client"
// import { useEffect } from "react";
import { useCart, CartItem } from "@/app/context/CartContext";
import Image from "next/image";
import { featuredProducts } from "@/data";
import React from "react";

// Type for product data from the data file
type ProductData = {
  id: number;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  options?: { title: string; additionalPrice: number }[];
};

const Feature = () => {
  const { getItemQuantity, addToCart, changeQuantity } = useCart();

  const handleAddToCart = (item: ProductData) => {
    const qty = getItemQuantity(item.id);
    console.log(`Adding ${item.id} (${item.title}) to cart, current quantity: ${qty}`);
    
    if (qty === 0) {
      const cartItem: CartItem = {
        id: item.id,
        title: item.title,
        desc: item.desc || "",
        img: item.img || "",
        price: item.price,
        options: item.options,
        catagory: [], // You might want to add category data
        quantity: 1,
      };
      addToCart(cartItem);
    } else {
      changeQuantity(item.id, +1);
    }
  };

  return (
    <div className="w-screen overflow-x-scroll text-red-500">
      <div className="w-max flex">
        {featuredProducts.map((item) => (
          <div key={item.id} className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]">
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain"/>
              </div>
            )}
            <div className="flex-1 flex flex-col gap-4 items-center text-center justify-center">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button 
                onClick={() => handleAddToCart(item)} 
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;