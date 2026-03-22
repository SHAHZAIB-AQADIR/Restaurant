import { NextResponse } from "next/server";

// TypeScript interface for Order
interface OrderItem {
  id: string;
  customer: string;
  products: string;
  price: string;
  status: string;
  date: string;
}

// Global variable (Server memory mein orders save rakhega)
const ordersStore: OrderItem[] = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const newOrder: OrderItem = {
      customer: body.customer || "Guest",
      products: body.products || "",
      price: body.price || "0.00",
      id: "ORD-" + Math.floor(Math.random() * 100000),
      status: "On the way",
      date: new Date().toLocaleString(),
    };

    ordersStore.push(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}

export async function GET() {
  // no-cache ke liye header set kiya taake naya data hamesha dikhe
  return NextResponse.json(ordersStore, {
    headers: { "Cache-Control": "no-store" },
  });
}