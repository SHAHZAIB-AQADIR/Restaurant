import { pizzas } from "@/data";
// import Image from "next/image";
// import Link from "next/link";
import React from "react";
import CategoryProducts from "./CategoryProducts";

const CategoryPage = () => {
  return (
    <div className="flex flex-wrap text-red-500">
      <CategoryProducts products={pizzas} />
    </div>
  );
};

export default CategoryPage;