"use client";

import { useCart, CartItem } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
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

interface CategoryProductsProps {
  products: ProductData[];
}

const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, item: ProductData) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
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
  };

  return (
    <>
      {products.map((item) => (
        <Link className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between group odd:bg-fuchsia-50" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl">${item.price}</h2>
            <button 
              className="hidden group-hover:block uppercase bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={(e) => handleAddToCart(e, item)}
            >
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CategoryProducts; 