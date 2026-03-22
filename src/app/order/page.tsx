"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface OrderItem {
  id: string;
  date: string;
  price: string;
  products: string;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data: OrderItem[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-20 text-center font-bold text-red-500">LOADING ORDERS...</div>;

  return (
    <div className="p-4 lg:px-20 min-h-screen">
      <div className="flex justify-between mb-8 items-center">
        <h1 className="text-2xl font-bold uppercase">My Orders</h1>
        <Link href="/" className="bg-red-500 text-white px-4 py-2 rounded">Home</Link>
      </div>
      <table className="w-full border-separate border-spacing-y-3">
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="bg-red-50 text-sm md:text-base">
              <td className="py-6 px-2 font-mono text-xs">{order.id}</td>
              <td className="py-6 px-2 font-bold">${order.price}</td>
              <td className="py-6 px-2 text-red-500 font-bold uppercase italic">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}